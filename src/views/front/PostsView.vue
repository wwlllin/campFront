<template lang="pug">
VContainer
  VRow
    VCol(cols="12" md="6" lg="3" v-for="post in posts" :key="post._id")
      PostCard(v-bind="post")
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import PostCard from '@/components/PostCard.vue'

const { api } = useApi()
const createSnackbar = useSnackbar()

const posts = ref([])

onMounted(async () => {
  try {
    const { data } = await api.get('/posts', {
      params: {
        itemsPerPage: -1
      }
    })
    posts.value.push(...data.result.data)
    await nextTick()
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
</script>

  <style scoped lang="sass">

  </style>
