<template lang="pug">
//- 手機版側欄
VNavigationDrawer(v-model="drawer" temporary location="left" v-if="isMobile" color="#EDF7D2")
  VList(nav)
    VBtn(prepend-icon="mdi-account" @click="dialog= true" class="accountBtn" color="transparent" :elevation="0" v-if="!user.isLogin")
      VDialog(v-model="dialog" width="500px")
        VStepper(v-model="step" :items="['註冊', '登入']" editable hide-actions class="dialogBackground")
          template(v-slot:item.1)
            RegisterView
          template(v-slot:item.2)
            LoginView
    template(v-for="item in navItems" :key="item.to")
      VListItem(:to="item.to" v-if="item.show")
        template(#prepend)
          VIcon(:icon="item.icon" class="color")
        VListItemTitle(class="color") {{ item.text }}
    VListItem(v-if="user.isLogin" @click="logout")
      template(#prepend)
        VIcon(icon="mdi-logout" class="color")
      VListItemTitle(class="color") 登出
//- 導覽列
VAppBar(color="#EDF7D2")
  VContainer.d-flex.align-center
    VBtn(to="/" :active="false")
      VImg(class="logo" :src="imageUrl")
    VSpacer
    //- 手機版導覽列
    template(v-if="isMobile")
      VAppBarNavIcon(@click="drawer = true" class="color")
    //- 電腦版導覽列
    template(v-else)
      template(v-for="item in navItems" :key="item.to")
        VBtn(:to="item.to" :prepend-icon="item.icon" v-if="item.show" class="color") {{ item.text }}
          VBadge(color="#014803" :content="user.cart" v-if="item.to === '/cart'" floating)
      VBtn(prepend-icon="mdi-logout" v-if="user.isLogin" @click="logout" class="color") 登出

      VBtn(prepend-icon="mdi-account" @click="dialog= true" class="color accountBtn" v-if="!user.isLogin")
        VDialog(v-model="dialog" width="500px")
          VStepper(v-model="step" :items="['註冊', '登入']" editable hide-actions class="dialogBackground")
            template(v-slot:item.1)
              RegisterView
            template(v-slot:item.2)
              LoginView
//- 頁面內容
VMain
  RouterView(:key="$route.path")
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/user'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
import RegisterView from '@/views/front/RegisterView.vue'
import LoginView from '@/views/front/LoginView.vue'

const { apiAuth } = useApi()
const router = useRouter()
const createSnackbar = useSnackbar()
const user = useUserStore()

const imageUrl = computed(() => new URL('@/assets/WECAMP.png', import.meta.url).href)
// 手機版判斷
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

// 手機版側欄開關
const drawer = ref(false)

const dialog = ref(false)
const step = ref(2)

// 導覽列項目
const navItems = computed(() => {
  return [
    // {
    //   to: '/register',
    //   text: '註冊',
    //   icon: 'mdi-account-plus',
    //   show: !user.isLogin
    // },
    // {
    //   to: '/login',
    //   text: '登入',
    //   icon: 'mdi-login',
    //   show: !user.isLogin
    // },
    {
      to: '/posts',
      text: '營區貼文',
      icon: 'mdi-image-outline',
      show: !user.isLogin || user.isLogin
    },
    {
      to: '/articles',
      text: '文章專欄',
      icon: 'mdi-post-outline',
      show: !user.isLogin || user.isLogin
    },
    {
      to: '/products',
      text: '露營商品',
      icon: 'mdi-store-outline',
      show: !user.isLogin || user.isLogin
    },
    // {
    //   to: '/cart',
    //   text: '購物車',
    //   icon: 'mdi-cart-variant',
    //   show: user.isLogin
    // },
    // {
    //   to: '/orders',
    //   text: '訂單',
    //   icon: 'mdi-list-box-outline',
    //   show: user.isLogin
    // },
    {
      to: '/user',
      text: 'user管理',
      icon: 'mdi-cog-outline',
      show: user.isLogin && !user.isAdmin
    },
    {
      to: '/admin',
      text: 'admin管理',
      icon: 'mdi-cog',
      show: user.isLogin && user.isAdmin
    }
  ]
})

const logout = async () => {
  try {
    await apiAuth.delete('/users/logout')
    user.logout()
    createSnackbar({
      text: '登出成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    router.push('/')
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
.logo
  width: 120px
.color
  color: #014803
  font-weight: 900
.dialogBackground
  background-image: url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fG1vdW50YWlufGVufDB8MXwwfHx8MA%3D%3D')
  background-size: cover
  color: #111
.card
  display: flex
  text-align: center
  align-items: center
  width: 40vw
  height: 60vh
  background-color: #B2E6F2
.accountBtn
  font-size: 16px
  padding-right: 3px
  padding-left: 15px
  min-width: 10px
  height: 40px
  border-radius: 50%
  color: #014803 !important

</style>
