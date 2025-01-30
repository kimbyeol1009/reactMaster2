import { createSlice } from "@reduxjs/toolkit"
//useState()와 비슷한 속성, state하나를 slice라고 부름
let user = createSlice({
    name : 'user',
    initialState: {name:'kim', age:20},
    //redux로 state 변경하는 방법 1.
    reducers: {
        changeName(state){
            return {name : 'john ', age:20}
        },
        changeAge(state,a){
            state.age +=a.payload
        },
    }
}) 
export let {changeName, changeAge} = user.actions
export default user