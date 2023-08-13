import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { addItem } from "../store.js";

import { Context1 } from './../App.js'
import { useDispatch } from "react-redux";

function Detail(props) {

    let { 재고, shoes } = useContext(Context1)

    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);
    let [탭, 탭변경] = useState(0);
    let dispatch = useDispatch();

    let [num, setNum] = useState('');
    let [fade2, setFade2] = useState('')
    let { id } = useParams();

    let 찾은상품 = props.shoes.find((a) => {
        return a.id == id
    })


    // useEffect(() => {
    //     let a = setTimeout(function () {
    //         setAlert(false)
    //         console.log(2);
    //     }, 2000)
    //     return () => {
    //         clearTimeout(a); //useEffect동작 전 실행되는 return () => {},unmount시 1회 실행됨
    //         console.log(1);
    //     }
    // }, []) // []추가시 mount될때만 실행
    // mount,update시 실행, 렌더링이 다 된 이후 실행됨.
    useEffect(() => {
        setFade2('end')
        let 꺼낸거 = localStorage.getItem('watched')
        꺼낸거 = JSON.parse(꺼낸거)
        꺼낸거.push(찾은상품.id)

        꺼낸거 = new Set(꺼낸거)
        꺼낸거 = Array.from(꺼낸거) // 자료를 어레이로 변환
        localStorage.setItem('watched', JSON.stringify(꺼낸거))

        return () => {
            setFade2('')
        }
    }, [])

    return (
        <div className={"container start " + fade2}>
            {
                alert == true ? <div className="alert alert-warning">
                    2초이내 구매시 할인
                </div> : null
            }

            {count}
            <button onClick={() => { setCount(count + 1) }}>버튼</button>
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes" + 찾은상품.id + ".jpg"} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}원</p>
                    <button className="btn btn-danger" onClick={() => {
                        dispatch(addItem({ id: 찾은상품.id, name: 찾은상품.title, count: 1 }))
                    }}>주문하기</button>
                </div>

                <Nav variant="tabs" defaultActiveKey="link0">
                    <Nav.Item>
                        <Nav.Link eventKey="link0" onClick={() => { 탭변경(0) }}>버튼0</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link1" onClick={() => { 탭변경(1) }}>버튼1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link2" onClick={() => { 탭변경(2) }}>버튼2</Nav.Link>
                    </Nav.Item>
                </Nav>
                <TabContent 탭={탭} />

            </div>
            <input onChange={((e) => { setNum(e.target.value) })} />
        </div>
    )

}

function TabContent({ 탭 }) {

    let [fade, setFade] = useState('')
    let { 재고 } = useContext(Context1)
    useEffect(() => {
        let a = setTimeout(() => {
            setFade('end')
        }, 100)

        return () => {
            clearTimeout(a)
            setFade('')
        }
    }, [탭])

    return <div className={"start " + fade}>{[<div>{재고}</div>, <div>내용1</div>, <div>내용2</div>][탭]}</div>
}
export default Detail;