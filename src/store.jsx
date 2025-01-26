import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";
// useState()와 비슷한 속성, state하나를 slice라고 부름
// let user = createSlice({
//     name : 'user',
//     initialState: {name:'kim', age:20},
//     redux로 state 변경하는 방법 1.
//     reducers: {
//         changeName(state){
//             return {name : 'john ', age:20}
//         },
//         changeAge(state,a){
//             state.age +=a.payload
//         }
//     }
// }) 
// 2. export해주기
export let {changeName, changeAge} = user.actions

let stock = createSlice({
    name : 'stock',
    initialState: [10,11,12]
})
let cart = createSlice({
    name : 'cart',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ] 
})

export default configureStore({
    reducer:{
        user : user.reducer,
        stock : stock.reducer,
        cart : cart.reducer
    }
}) 