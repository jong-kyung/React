import { useState, memo } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { changeName, changeAge } from '../store/uesrSlice.js';
import { addCount } from '../store.js'

let Child = memo(function () { //재렌더링 막는 memo ,props가 변할때만 재렌더링됨, useMemo도 있음! useEffect와 사용법이 유사
    console.log('재렌더링됨')
    return <div>자식임</div>
})


function Cart() {

    let state = useSelector((state) => state);
    // store에 있던 모든 state가 남음
    let dispatch = useDispatch();
    let [count, setCount] = useState(0)

    return (
        <div>
            <Child count={count}></Child>
            <button onClick={() => { setCount(count + 1) }}></button>
            <h6>{state.user.name}{state.user.age}의 장바구니</h6>
            <button onClick={() => {
                dispatch(changeAge(10))
            }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map(function (a, i) {
                            return (
                                <tr key={i}>
                                    <td>{state.cart[i].id}</td>
                                    <td>{state.cart[i].name}</td>
                                    <td>{state.cart[i].count}</td>
                                    <td><button onClick={() => {
                                        dispatch(addCount(state.cart[i].id))
                                    }}>+</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;