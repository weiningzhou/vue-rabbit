import request from '@/utils/http'

export const addCartAPI = ({skuId,count})=>{
    return request({
        url:'/member/cart',
        method:'POST',
        data:{
            skuId,
            count
        }
    })
}

export const getNewCartListAPI = ()=>{
    return request({
        url:'/member/cart'
    })
}

//删除购物车物品信息接口
export const delCartAPI = (ids)=>{
    return request({
        url:'/member/cart',
        method:'DELETE',
        data:{
            ids
        }
    })
}