<template lang="pug">
VNavigationDrawer(v-model="drawer" :rail="rail" permanent @click="rail=false")
  VList
    VListItem(:prepend-avatar :title="user.account" nav)
  VDivider
  VList(density="compact" nav)
    VListItem(
      v-for="item in navItems" :key="item.to"
      :to="item.to" :title="item.text" :prepend-icon="item.icon"
    )
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
  // { to: '/admin/members', text: '會員管理', icon: 'mdi-account-cog-outline' },
  { to: '/admin/posts', text: '貼文管理', icon: 'mdi-image-edit-outline' },
  { to: '/admin/products', text: '商品管理', icon: 'mdi-store-cog-outline' },
  { to: '/admin/articles', text: '文章管理', icon: 'mdi-file-cog-outline' },
  { to: '/', text: '回首頁', icon: 'mdi-home-outline' }
]

const prependAvatar = computed(() => {
  return `https://source.boringavatars.com/beam/120/${user.account}?colors=4EB3DE,8DE0A6,FCF09F,F27C7C,DE528C`
})
</script>
