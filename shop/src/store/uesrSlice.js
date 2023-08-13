import { createSlice } from '@reduxjs/toolkit'
let user = createSlice({
    name: 'user',
    initialState: { name: 'kim', age: 20 },
    reducers: {
        changeName(state) {
            state.name = 'park'
        },
        changeAge(state, action) {
            state.age += action.payload;
        }
        // 함수2(){}
    }
})
export default user;

export let { changeName, changeAge } = user.actions