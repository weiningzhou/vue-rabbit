import {defineStore} from 'pinia'
import {ref,computed} from 'vue'
import {useUserStore} from './user'
import {addCartAPI,getNewCartListAPI,delCartAPI} from '@/apis/cart'

export const useCartStore = defineStore('cart',()=>{
    const cartList = ref([])
    const userStore = useUserStore()
    const isLogin = computed(()=>userStore.userInfo.token)

    //获取最新的购物车列表
    const getNewCardList = async ()=>{
        const res = await getNewCartListAPI()
        cartList.value = res.result
    }
    const addCart= async (goods)=>{
        const {skuId,count} = goods
        if(isLogin.value){
           await addCartAPI({skuId,count})
           getNewCardList()
        }else{
            const item = cartList.value.find((item)=>goods.skuId === item.skuId)
            if(item){
                item.count++
            }else{
                cartList.value.push(goods)
            }
        }
    }
    const delCart= async (skuId)=>{
        if(isLogin.value){
            //调用接口删除购物车物品
            await delCartAPI([skuId])
            //接口获取购物车列表，并赋值给本地购物车列表
            getNewCardList()
        }else{
            cartList.value = cartList.value.filter(item => item.skuId !== skuId)
        }
    }
    //清空购物车信息
    const clearCart = ()=>{
        cartList.value = []
    }
    const singleCheck=(skuId,selected)=>{
        const item = cartList.value.find((item)=>item.skuId===skuId)
        item.selected = selected
    }
    const allCheck=(selected)=>{
        cartList.value.forEach((item)=>item.selected=selected)
    }

    const allCount = computed(()=>cartList.value.reduce((a,c)=>a + c.count,0))
    const allPrice = computed(()=>cartList.value.reduce((a,c)=>a + c.count * c.price,0))
    const isAll=computed(()=>cartList.value.every((item)=>item.selected))
    const selectedCount=computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a + c.count,0))
    const selectedPrice=computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a + c.count * c.price,0))
    return{
        cartList,
        allCount,
        allPrice,
        isAll,
        selectedCount,
        selectedPrice,
        addCart,
        delCart,
        singleCheck,
        allCheck,
        clearCart
    }
},{
    persist:true
})