import { defineStore } from "pinia";
import {loginAPI} from '@/apis/user'
import {ref} from 'vue'
import {useCartStore} from './cart'

export const useUserStore =defineStore('user',()=>{
    const userInfo = ref({})
    const cartStore = useCartStore()
    const getUserInfo = async ({account,password})=>{
        const res = await loginAPI({account,password})
        userInfo.value = res.result
    }
    const clearUserInfo = ()=>{
        userInfo.value = {}
        //用户退出登录时，清空购物车列表信息
        cartStore.clearCart()
    }
    return{
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist:true
})