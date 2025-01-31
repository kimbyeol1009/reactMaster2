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
// export let {changeName, changeAge} = user.actions

let stock = createSlice({
    name : 'stock',
    initialState: [10,11,12]
})
let cart = createSlice({
    name : 'cart',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ],
      reducers:{
          addCnt(state, action){
              let item = state.find((item)=>item.id===action.payload)
              item.count+=1
          },
          addCartCnt(state, action){
            let {id,name,count} = action.payload
            let item = state.find((item)=>item.id===id)
            if(item){item.count += count}
            else {state.push({id,name,count})}
        },
        removeItem(state,action){
            return state.filter((item)=>item.id!==action.payload)
        }
      }
})
export let {addCnt,addCartCnt,removeItem} = cart.actions

export default configureStore({
    reducer:{
        user : user.reducer,
        stock : stock.reducer,
        cart : cart.reducer
    }
}) 