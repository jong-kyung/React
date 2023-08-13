import { createContext, useEffect, useState, lazy, Suspense, useTransition, useDeferredValue } from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap' // 부트스트랩 설치
import './App.module.css';
import './App.css';
import data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js'
import Cart from './routes/Cart.js'
import axios from 'axios'
import { useQuery } from 'react-query'

const Details = lazy(() => import('./routes/Detail.js'))
const Carts = lazy(() => import('./routes/Cart.js'))

export let Context1 = createContext();

function App() {
  let navigate = useNavigate() // navigate 선언 / href와 유사
  let [shoes, setShoes] = useState(data)
  let [재고] = useState([10, 11, 12])

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify([]))
  }, [])

  return (
    <div className='App'>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>ShoseShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Link to='/'>홈</Link>
      <Link to='/detail'>상세페이지</Link>
      <Suspense fallback={<div>로딩중</div>}>
        <Routes>
          <Route path="/" element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((a, i) => {
                    return <Card shoes={shoes[i]} i={i} key={i} ></Card>
                  })}
                </div>
              </div>
            </>
          } />
          <Route path='/about' element={<About />}>
            <Route path='member' element={<div>멤버임</div>}></Route>
            <Route path='location' element={<div>주소임</div>}></Route>
            {/* About의 Outlet에 element가 작성됨 */}
          </Route>
          <Route path='/detail/:id' element={
            <Context1.Provider value={{ 재고, shoes }}>
              <Detail shoes={shoes} />
            </Context1.Provider>}>
          </Route>
          <Route path='/cart' element={<Cart></Cart>}></Route>
          <Route path='*' element={<div>없는 페이지에요</div>}></Route>
        </Routes>
      </Suspense>
      
      <button onClick={() => {
        // 로딩중 ui 띄우기
        axios.get('https://codingapple1.github.io/shop/data2.json').then((결과) => {
          console.log(결과.data)
          let copy = [...shoes, ...결과.data];
          setShoes(copy)
          // 로딩중 ui 숨기기
        })
          .catch(() => {
            console.log('실패함')
            // 로딩중 ui 숨기기
          })
      }}>버튼</button>
    </div>
  )
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props) {
  return (
    <Col >
      <img src={"https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"} width="80%" />
      <h4>{props.shoes['title']}</h4>
      <p>{props.shoes['content']}</p>
      <p>{props.shoes['price']}</p>
    </Col>
  )
}

export default App;
