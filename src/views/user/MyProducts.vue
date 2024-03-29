<template lang="pug">
VContainer
  VRow
    VCol(cols="12")
      h1.text-center 商品管理
    VDivider
    VCol(cols="12")
      VBtn(color="green" @click="openDialog()") 新增商品
      VCol(cols="12")
      VDataTableServer(
        v-model:items-per-page="tableItemsPerPage"
        v-model:sort-by="tableSortBy"
        v-model:page="tablePage"
        :items="tableProducts"
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
        template(#[`item.sell`]="{ item }")
          VIcon(icon="mdi-check" v-if="item.sell")
        template(#[`item.createdAt`]="{ item }")
            | {{ new Date(item.createdAt).toLocaleString() }}
        template(#[`item.edit`]="{ item }")
          VBtn(icon="mdi-pencil" variant="text" color="blue" @click="openDialog(item)")
        //- template(#[`item.action`]="{ item }")
        //-   VBtn(variant="text" icon="mdi-delete" color="red" @click="deleteItem(item)")
VDialog(v-model="dialog" persistent width="500px")
  VForm(:disabled="isSubmitting" @submit.prevent="submit")
    VCard
      VCardTitle {{ dialogId === '' ? '新增商品' : '編輯商品' }}
      VCardText
        VTextField(
          label="名稱"
          v-model="name.value.value"
          :error-messages="name.errorMessage.value"
        )
        VTextField(
          label="價格"
          type="number" min="0"
          v-model="price.value.value"
          :error-messages="price.errorMessage.value"
        )
        VSelect(
          label="分類"
          :items="categories"
          v-model="category.value.value"
          :error-messages="category.errorMessage.value"
        )
        VCheckbox(
          label="上架"
          v-model="sell.value.value"
          :error-messages="sell.errorMessage.value"
        )
        VTextarea(
          label="說明"
          v-model="description.value.value"
          :error-messages="description.errorMessage.value"
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
    name.value.value = item.name
    price.value.value = item.price
    description.value.value = item.description
    category.value.value = item.category
    sell.value.value = item.sell
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
//     await apiAuth.delete('/myproducts/' + item._id)
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

const categories = ['營地轉讓', '露營裝備']

const schema = yup.object({
  name: yup
    .string()
    .required('缺少商品名稱'),
  price: yup
    .number()
    .typeError('商品價格格式錯誤')
    .required('缺少商品價格')
    .min(0, '商品價格不能小於 0'),
  description: yup
    .string()
    .required('缺少商品說明'),
  category: yup
    .string()
    .required('缺少商品分類')
    .test('isCategory', '商品分類錯誤', value => categories.includes(value)),
  sell: yup
    .boolean()
})
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    price: 0,
    description: '',
    category: '',
    sell: false
  }
})
const name = useField('name')
const price = useField('price')
const description = useField('description')
const category = useField('category')
const sell = useField('sell')

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

    // if (fileRecords.value.length > 0) {
    //   fd.append('image', fileRecords.value[0].file)
    // }
    if (fileRecords.value.length > 0) {
      for (const f of fileRecords.value) {
        fd.append('image', f.file)
      }
    }

    if (dialogId.value === '') {
      await apiAuth.post('/products', fd)
    } else {
      await apiAuth.patch('/products/' + dialogId.value, fd)
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

const tableProducts = ref([])

const tableHeaders = [
  { title: '圖片', align: 'center', sortable: false, key: 'image' },
  { title: '名稱', align: 'center', sortable: true, key: 'name' },
  { title: '價格', align: 'center', sortable: true, key: 'price' },
  { title: '分類', align: 'center', sortable: true, key: 'category' },
  { title: '上架', align: 'center', sortable: true, key: 'sell' },
  { title: '上架時間', align: 'center', sortable: true, key: 'createdAt' },
  { title: '編輯', align: 'center', sortable: false, key: 'edit' }
  // { title: '刪除', key: 'action' }
]

const tableLoading = ref(true)

const tableItemsLength = ref(0)

const tableSearch = ref('')

const tableLoadItems = async () => {
  tableLoading.value = true
  try {
    const { data } = await apiAuth.get('/products/all', {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || 'createdAt',
        sortOrder: tableSortBy.value[0]?.order === 'asc' ? 1 : -1,
        search: tableSearch.value
      }
    })
    tableProducts.value.splice(0, tableProducts.value.length, ...data.result.data)
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
