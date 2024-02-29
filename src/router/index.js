// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router'
import { useUserStore } from '@/store/user'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/FrontLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/front/HomeView.vue'),
        meta: {
          title: 'WE CAMP',
          login: false,
          admin: false
        }
      },
      {
        path: 'posts',
        name: 'Posts',
        component: () => import('@/views/front/PostsView.vue'),
        meta: {
          title: 'WE CAMP | 營區貼文',
          login: false,
          admin: false
        }
      },
      {
        path: 'articles',
        name: 'Articles',
        component: () => import('@/views/front/ArticlesView.vue'),
        meta: {
          title: 'WE CAMP | 文章專欄',
          login: false,
          admin: false
        }
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/front/ProductsView.vue'),
        meta: {
          title: 'WE CAMP | 露營商品',
          login: false,
          admin: false
        }
      },
      {
        path: 'posts/:id',
        name: 'post',
        component: () => import('@/views/front/PostView.vue'),
        meta: {
          title: 'WE CAMP | 貼文',
          login: false,
          admin: false
        }
      },
      {
        path: 'articles/:id',
        name: 'article',
        component: () => import('@/views/front/ArticleView.vue'),
        meta: {
          title: 'WE CAMP | 文章',
          login: false,
          admin: false
        }
      },
      {
        path: 'products/:id',
        name: 'product',
        component: () => import('@/views/front/ProductView.vue'),
        meta: {
          title: 'WE CAMP | 商品',
          login: false,
          admin: false
        }
      }

      // {
      //   path: 'register',
      //   name: 'Register',
      //   component: () => import('@/views/front/RegisterView.vue'),
      //   meta: {
      //     title: 'WE CAMP | 註冊',
      //     login: false,
      //     admin: false
      //   }
      // },
      // {
      //   path: 'login',
      //   name: 'Login',
      //   component: () => import('@/views/front/LoginView.vue'),
      //   meta: {
      //     title: 'WE CAMP | 登入',
      //     login: false,
      //     admin: false
      //   }
      // },
      // {
      //   path: 'products/:id',
      //   name: 'product',
      //   component: () => import('@/views/front/ProductView.vue'),
      //   meta: {
      //     title: 'WE CAMP | 商品',
      //     login: false,
      //     admin: false
      //   }
      // },
      // {
      //   path: 'cart',
      //   name: 'Cart',
      //   component: () => import('@/views/front/CartView.vue'),
      //   meta: {
      //     title: 'WE CAMP | 購物車',
      //     login: true,
      //     admin: false
      //   }
      // },
      // {
      //   path: 'orders',
      //   name: 'Orders',
      //   component: () => import('@/views/front/OrdersView.vue'),
      //   meta: {
      //     title: 'WE CAMP | 訂單',
      //     login: true,
      //     admin: false
      //   }
      // }
    ]
  },
  {
    path: '/user',
    component: () => import('@/layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        name: 'UserHome',
        component: () => import('@/views/user/MyHome.vue'),
        meta: {
          title: 'WE CAMP | User管理',
          login: true,
          user: true
        }
      },
      {
        path: 'myprofile',
        name: 'UserProfile',
        component: () => import('@/views/user/MyProfile.vue'),
        meta: {
          title: 'WE CAMP | 我的個人頁',
          login: true,
          user: true
        }
      },
      {
        path: 'myposts',
        name: 'UserPosts',
        component: () => import('@/views/user/MyPosts.vue'),
        meta: {
          title: 'WE CAMP | 我的貼文',
          login: true,
          user: true
        }
      },
      {
        path: 'myproducts',
        name: 'UserProducts',
        component: () => import('@/views/user/MyProducts.vue'),
        meta: {
          title: 'WE CAMP | 我的商品',
          login: true,
          user: true
        }
      },
      {
        path: 'mycart',
        name: 'UserCart',
        component: () => import('@/views/user/MyCart.vue'),
        meta: {
          title: 'WE CAMP | 我的購物車',
          login: true,
          user: true
        }
      },
      {
        path: 'myorders',
        name: 'UserOrders',
        component: () => import('@/views/user/MyOrders.vue'),
        meta: {
          title: 'WE CAMP | 我的訂單',
          login: true,
          user: true
        }
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import('@/views/admin/HomeManagement.vue'),
        meta: {
          title: 'WE CAMP | Admin管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'members',
        name: 'Members',
        component: () => import('@/views/admin/MembersManagement.vue'),
        meta: {
          title: 'WE CAMP | 會員管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'posts',
        name: 'AdminPosts',
        component: () => import('@/views/admin/PostsManagement.vue'),
        meta: {
          title: 'WE CAMP | 貼文管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('@/views/admin/ProductsManagement.vue'),
        meta: {
          title: 'WE CAMP | 商品管理',
          login: true,
          admin: true
        }
      },
      {
        path: 'articles',
        name: 'AdminArticles',
        component: () => import('@/views/admin/ArticlesManagement.vue'),
        meta: {
          title: 'WE CAMP | 文章管理',
          login: true,
          admin: true
        }
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: 'WE CAMP | 找不到',
      login: false,
      admin: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'All',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

router.beforeEach(async (to, from, next) => {
  const user = useUserStore()

  if (from === START_LOCATION) {
    await user.getProfile()
  }
  if (user.isLogin && ['/register', '/login'].includes(to.path)) {
    next('/')
  } else if (to.meta.login && !user.isLogin) {
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router
