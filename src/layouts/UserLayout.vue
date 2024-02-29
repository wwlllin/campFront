<template lang="pug">
VNavigationDrawer(v-model="drawer" :rail="rail" permanent @click="rail=false")
  VList
    VListItem(:prepend-avatar :title="user.account" nav)
      template(#append)
        VBtn(variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail")
  VDivider
  VList(density="compact" nav)
  VListItem(
    v-for="item in navItems" :key="item.to"
    :to="item.to" :title="item.text" :prepend-icon="item.icon"
  )
    template(#append)
      VBadge(color="error" :content="user.cart" v-if="item.to === '/mycart'" inline)
VMain
  RouterView
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { ref, computed } from 'vue'

const user = useUserStore()

const drawer = ref(true)
const rail = ref(true)

const navItems = [
  // { to: '/user/myprofile', text: '我的個人頁', icon: 'mdi-account-edit-outline' },
  { to: '/user/myposts', text: '我的貼文', icon: 'mdi-image-edit-outline' },
  { to: '/user/myproducts', text: '我的商品', icon: 'mdi-store-edit-outline' },
  { to: '/user/mycart', text: '我的購物車', icon: 'mdi-cart-variant' },
  { to: '/user/myorders', text: '我的訂單', icon: 'mdi-list-box' },
  { to: '/', text: '回首頁', icon: 'mdi-home' }
]

const prependAvatar = computed(() => {
  return `https://source.boringavatars.com/beam/120/${user.account}?colors=4EB3DE,8DE0A6,FCF09F,F27C7C,DE528C`
})
</script>
