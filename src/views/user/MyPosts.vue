<template lang="pug">
VContainer
  VRow
    VCol(cols="12")
      h1.text-center 貼文管理
    VDivider
    VCol(cols="12")
      VBtn(color="green" @click="openDialog()") 新增貼文
      VCol(cols="12")
      VDataTableServer(
        v-model:items-per-page="tableItemsPerPage"
        v-model:sort-by="tableSortBy"
        v-model:page="tablePage"
        :items="tablePosts"
        :headers="tableHeaders"
        :loading="tableLoading"
        :items-length="tableItemsLength"
        :search="tableSearch"
        @update:items-per-page="tableLoadItems"
        @update:sort-by="tableLoadItems"
        @update:page="tableLoadItems"
        hover
      )
        template(#top)
          VTextField(
            label="搜尋"
            append-icon="mdi-magnify"
            v-model="tableSearch"
            @click:append="tableApplySearch"
            @keydown.enter="tableApplySearch"
          )
        template(#[`item.image`]="{ item }")
          VImg(:src="item.image[0]" height="50px")
        template(#[`item.release`]="{ item }")
          VIcon(icon="mdi-check" v-if="item.release")
        template(#[`item.createdAt`]="{ item }")
            | {{ new Date(item.createdAt).toLocaleString() }}
        template(#[`item.edit`]="{ item }")
          VBtn(icon="mdi-pencil" variant="text" color="blue" @click="openDialog(item)")
        //- template(#[`item.action`]="{ item }")
        //-   VBtn(variant="text" icon="mdi-delete" color="red" @click="deleteItem(item)")
VDialog(v-model="dialog" persistent width="500px")
  VForm(:disabled="isSubmitting" @submit.prevent="submit")
    VCard
      VCardTitle {{ dialogId === '' ? '新增貼文' : '編輯貼文' }}
      VCardText
        VTextField(
          label="標題"
          v-model="title.value.value"
          :error-messages="title.errorMessage.value"
        )
        VCheckbox(
          label="發佈"
          v-model="release.value.value"
          :error-messages="release.errorMessage.value"
        )
        VTextarea(
          label="內容"
          v-model="content.value.value"
          :error-messages="content.errorMessage.value"
        )
        VueFileAgent(
          v-model="fileRecords"
          v-model:rawModelValue="rawFileRecords"
          accept="image/jpeg,image/png"
          deletable
          :error-text="{type: '檔案格式不支援', size: '檔案超過 1MB 大小限制'}"
          help-text="選擇檔案或拖曳到這裡"
          :max-files="5"
          multiple
          max-size="1MB"
          ref="fileAgent"
        )
      VCardActions
        VSpacer
        VBtn(color="red" :disabled="isSubmitting" @click="closeDialog") 取消
        VBtn(color="green" type="submit" :loading="isSubmitting") 送出
</template>

<script setup>
import { ref } from 'vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const fileAgent = ref(null)

const dialog = ref(false)

const dialogId = ref('')

const openDialog = (item) => {
  if (item) {
    dialogId.value = item._id
    title.value.value = item.title
    content.value.value = item.content
    release.value.value = item.release
  } else {
    dialogId.value = ''
  }
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  resetForm()
  while (fileRecords.value.length > 0) {
    fileAgent.value.deleteFileRecord(fileRecords.value[0])
  }
}

// const deleteItem = async (item) => {
//   try {
//     await apiAuth.delete('/myposts/' + item._id)
//     createSnackbar({
//       text: '刪除成功',
//       showCloseButton: false,
//       snackbarProps: {
//         timeout: 2000,
//         color: 'green',
//         location: 'bottom'
//       }
//     })
//     tableLoadItems()
//   } catch (error) {
//     console.log(error)
//     const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
//     createSnackbar({
//       text,
//       showCloseButton: false,
//       snackbarProps: {
//         timeout: 2000,
//         color: 'red',
//         location: 'bottom'
//       }
//     })
//   }
// }

const schema = yup.object({
  title: yup
    .string()
    .required('缺少貼文標題'),
  content: yup
    .string()
    .required('缺少貼文內容'),
  release: yup
    .boolean()
})
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    content: '',
    release: false
  }
})
const title = useField('title')
const content = useField('content')
const release = useField('release')

const fileRecords = ref([])
const rawFileRecords = ref([])

const submit = handleSubmit(async (values) => {
  if (fileRecords.value[0]?.error) return
  if (dialogId.value === '' && fileRecords.value.length === 0) return
  try {
    const fd = new FormData()
    for (const key in values) {
      fd.append(key, values[key])
    }

    if (fileRecords.value.length > 0) {
      for (const f of fileRecords.value) {
        fd.append('image', f.file)
      }
    }

    if (dialogId.value === '') {
      await apiAuth.post('/posts', fd)
    } else {
      await apiAuth.patch('/posts/' + dialogId.value, fd)
    }

    createSnackbar({
      text: dialogId.value === '' ? '新增成功' : '編輯成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    closeDialog()
    tableApplySearch()
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
  }
})

const tableItemsPerPage = ref(10)

const tableSortBy = ref([
  { key: 'createdAt', order: 'desc' }
])
const tablePage = ref(1)

const tablePosts = ref([])

const tableHeaders = [
  { title: '圖片', align: 'center', sortable: false, key: 'image' },
  { title: '標題', align: 'center', sortable: false, key: 'title' },
  { title: '發佈', align: 'center', sortable: true, key: 'release' },
  { title: '發佈時間', align: 'center', sortable: true, key: 'createdAt' },
  { title: '編輯', align: 'center', sortable: false, key: 'edit' }
  // { title: '刪除', key: 'action' }
]

const tableLoading = ref(true)

const tableItemsLength = ref(0)

const tableSearch = ref('')

const tableLoadItems = async () => {
  tableLoading.value = true
  try {
    const { data } = await apiAuth.get('/posts/all', {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || 'createdAt',
        sortOrder: tableSortBy.value[0]?.order === 'asc' ? 1 : -1,
        search: tableSearch.value
      }
    })
    tablePosts.value.splice(0, tablePosts.value.length, ...data.result.data)
    tableItemsLength.value = data.result.total
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
  }
  tableLoading.value = false
}
tableLoadItems()

const tableApplySearch = () => {
  tablePage.value = 1
  tableLoadItems()
}

</script>
