import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'


import 'element-plus/dist/index.css'
import '@/assets/cust-elementplus.scss'
import '@/assets/icon/iconfont.css'

import '@/assets/base.scss'

import Utils from "@/utils/Utils.js"

import Verify from "@/utils/Verify.js"
import router from '@/router'





const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.config.globalProperties.Utils = Utils
app.config.globalProperties.Verify = Verify
app.mount('#app')

