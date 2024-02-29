<template lang="pug">
VContainer
  VRow
    VCol(cols="12")
      VCard.product-card(lass="mx-auto" max-width="344" hover)
        VImg(:src="image[0]" height="200" cover)
        VCardTitle
          RouterLink.text-decoration-none(:to="'/products/' + _id" class="Color") {{ name }}
        VSpacer
        VCardSubtitle(color="#014803") ${{ price }}
        VCardActions(style="white-space: pre;")
          VBtn(color="#014803" prepend-icon="mdi-cart" @click="addCart") 加入購物車
        VCardActions
          VBtn(color="#014803" variant="text") 商品說明
          VSpacer
          VBtn(:icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show")
        VExpandTransition
          div(v-show="show")
            VDivider
            VCardText(style="white-space: pre;" class="Color") {{ description }}
</template>

<script setup>
import { ref } from 'vue'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const { apiAuth } = useApi()
const user = useUserStore()
const createSnackbar = useSnackbar()
const router = useRouter()

const show = ref(false)
const props = defineProps(['_id', 'category', 'description', 'image', 'name', 'price', 'sell'])

const addCart = async () => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  try {
    const { data } = await apiAuth.patch('/users/cart', {
      product: props._id,
      quantity: 1
    })
    user.cart = data.result
    createSnackbar({
      text: '成功加入購物車',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
  } catch (error) {
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
}
</script>

<style scoped lang="sass">
.Color
  color: #014803!important
</style>
