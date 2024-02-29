<template lang="pug">
VContainer
  VRow
    VCol(cols="12")
      h1 {{ article.title }}
    VCol(cols="12" md="6")
      VImg(:src="article.image[0]")
    VCol(cols="12" md="6")
      p(class="mb-4") {{ article.category }}
      p(class="mb-4") {{ article.createdAt }}
      p(class="mb-4" style="white-space: pre;") {{ article.content }}
  VBtn(to='/' color="green") 回首頁
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const route = useRoute()
const router = useRouter()
const { api } = useApi()
const createSnackbar = useSnackbar()

const article = ref({
  _id: '',
  title: '',
  category: '',
  createdAt: '',
  content: '',
  image: '',
  release: true
})

onMounted(async () => {
  try {
    const { data } = await api.get('/articles/' + route.params.id)
    article.value._id = data.result._id
    article.value.title = data.result.title
    article.value.category = data.result.category
    article.value.content = data.result.content
    article.value.image = data.result.image
    article.value.release = data.result.release
    article.value.createdAt = data.result.createdAt

    document.title = `WE CAMP | ${article.value.name}`
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
    router.push('/')
  }
})
</script>
