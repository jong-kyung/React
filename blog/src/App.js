// 터미널의 warning 메시지 안뜨게 하는 법 맨 위에 eslint-disable 줄주석에 넣어주기.
import './App.css';
import { useState } from 'react' // useState 불러오기

function App() {

  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']); // 글제목 : state에 저장한 값, 글제목변경 : state 변경함수
  let [따봉, 따봉변경] = useState(0);
  let [modal, setModal] = useState(false); // set~ 로 변경함수명을 정해주는게 일반적임
  let [title, setTitle] = useState(0)
  let [입력값, 입력값변경] = useState('');

  return (
    <div className='App'>
      <div className='black-nav'>
        <h4>React Blog</h4>
      </div>

      <button onClick={() => {
        let copy = [...글제목]; // 원본을 보존하기위한 deep copy
        copy[0] = '여자 코트 추천';
        글제목변경(copy);
      }}>버튼</button>


      {
        글제목.map(function (데이터, i) {
          return (
            <div className='list' key={i} >
              {/* key 안에는 unique한 숫자를 넣어주면됨. react에서 map을 사용할땐 꼭 사용해주어야함 */}
              <h4 onClick={() => {
                setModal(!modal)
                setTitle(i)
              }}>
                {글제목[i]}
                <span onClick={(e) => { // 이벤트엔 함수가 들어가야 실행이됨
                  e.stopPropagation()
                  따봉변경(따봉++)
                }}>👍</span> {따봉}
              </h4>
              <button onClick={() => {
                let copy = [...글제목]
                copy.splice(i, 1) // i번째로부터 1개
                글제목변경(copy)
              }}
              >삭제</button>
              <h4>2월 17일 발행</h4>
            </div>
          )
        })
      }

      <div>
        <input onChange={(e) => {
          입력값변경(e.target.value) // 비동기처리때문에 state변경함수는 늦게처리됨
        }} />
        <button onClick={() => {
          let copy = [...글제목];
          copy.unshift(입력값)
          글제목변경(copy)
        }}>글발행</button>
      </div>

      {
        modal == true ? <Modal 글제목={글제목} color={'yellow'} 글제목변경={글제목변경} title={title}></Modal> : null
      }
      {/* JSX 내에서는 if문 사용이 불가능함 */}

    </div>
  )
}

// const Modal = () =>{
//   return(
//     <>
//     </>
//   )
// } // component 생성
function Modal(props) { // Component 생성
  return (
    <div className='modal'>
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={() => {
        let copy = [...props.글제목]
        copy[0] = '여자 코트 추천'
        props.글제목변경(copy)
      }}>버튼</button>
    </div>
  )
}


export default App;