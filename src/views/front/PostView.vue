<template lang="pug">
VContainer
  VRow
    VCol(cols="12")
      h1 {{ post.title }}
    VCol(cols="12" md="6")
      VImg(:src="post.image[0]")
    VCol(cols="12" md="6")
      p(class="mb-4") {{ post.createdAt }}
      p(class="mb-4" style="white-space: pre;") {{ post.content }}
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

const post = ref({
  _id: '',
  title: '',
  createdAt: '',
  content: '',
  image: '',
  release: true
})

onMounted(async () => {
  try {
    const { data } = await api.get('/posts/' + route.params.id)
    post.value._id = data.result._id
    post.value.title = data.result.title
    post.value.content = data.result.content
    post.value.image = data.result.image
    post.value.release = data.result.release
    post.value.createdAt = data.result.createdAt

    document.title = `WE CAMP | ${post.value.name}`
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
