# React
## 프로젝트 생성
``` bash
npx create-react-app 프로젝트명
# react 프로젝트 생성(pwa)
npx create-react-app 프로젝트명 --template cra-template-pwa
```
## 특징
### 페이지 구분
- 컴포넌트를 만들어서 상세페이지 내용을 채움

### CSS 작성시
- 컴포넌트명.module.css -> 다른 컴포넌트들의 css엔 적용이 안됨

### 폴더별 구분
- node_modules
- src : 리액트 사이트 발행시 압축됨
- public : 리액트 코드를 다 짜고 발행할 때 압축이 되지 않고 온전히 보존됨

## 문법
### state : 자료를 잠깐 저장할때 사용
- useState 함수 : let [(state에 보관한 자료, 작명), (state 변경하는 함수, 작명)] =  useState('남자 코트 추천');
- state 변경하는법 state변경함수(새로운state)
    - state변경함수 특징 : 기존 state == 신규 state의 경우 변경을 해주지 않음
- state가 변경이되면 html이 재렌더링이 됨. -> 변경되서 재렌더링이 되고 싶을때 사용
- state는 같은 state를 사용하는 컴포넌트 중 최상위 컴포넌트에 선언해야함.
- state 변경함수는 비동기적으로 처리됨

### Component : HTML 파일을 보기 좋게 리팩토링
- 생성 방법
  - function 생성 후 return()안에 html 담은 후 사용할 곳에 **<함수명></함수명>** 혹은 **<함수명/>** 쓰기, 보통 함수이름의 앞글자를 대문자로 함
- 언제 사용할까?
  1. 반복적인 html 축약할때 사용
  2. 큰 페이지들
  3. 자주 변경되는 것들

### props : state를 component에 주는 방식
- 부모 component의 state를 자식 component에 주는 방법
- props 사용방법
  1. <자식컴포넌트 작명={state이름}>
  2. props 파라미터 등록 후 props.작명 사용
- 자식 -> 부모는 불가능, 나란히 있는 component도 불가능

### useEffect : Lifecycle에 간섭하여 코드를 실행하게 도와주는 함수
- 컴포넌트의 Lifecycle
  1. 페이지에 장착됨(mount)
  2. 업데이트(update)
  3. 필요없으면 제거됨(unmount)

- 사용방법
    ``` javascript
        let [count,setCount] = useState(0)
        useEffect(() => {
            console.log('mount, update시 실행됩니다');
            console.log(2)
            return () => { 
                // return을 추가할경우 useEffect 동작 전에 실행됨. / cleaner function
                SetCount(1);
                console.log(1); 
                // ex) 신규 타이머가 있을때, 기존 타이머를 제거해달라는 요청을 넣을때 사용
                // ex) 서버에 데이터 요청을 보내는것을 제거함(기존에 요청보낸 것)
            }
        }, [count]) // []안에 useEffect 실행조건을 넣을 수 있음 / count가 변하면 실행
    ```

- 쓰는이유
1. useEffect는 HTML 렌더링 후에 동작함
2. 오래걸리는 작업을 해야할때 사용(연산, 서버에서 데이터가져오는 작업, 타이머 등)

### Context API
- props 전송 없이 공유 가능하게 하는 기본 함수. 하지만 실무에선 많이 사용하진 않음
- 사용방법
``` javascript
// App.js
let Context1 = createContext() // context를 생성해줌(state 보관함)

<Context1.Provider value={ {재고, shoes} }>
    <Detail shoes={shoes}/>
</Context1.Provider>
// Detail.js
    let { 재고, shoes } = useContext(Context1)
```

### lazy & Suspense
#### lazy
- component가 필요해지면 import
- 컴포넌트 로딩시간이 발생할 수 도 있음..
#### Suspense
- 컴포넌트가 로딩되는동안 보여줄 창을 설정할 수 있음
    ``` javascript
    // lazy
    const Details = lazy(() => import('./routes/Detail.js'))
    // suspense 
    <Suspense fallback={<div>로딩중</div>}>
        <Routes />
    </Suspense>
    ```

### memo, useMemo
#### memo
- 재렌더링을 막기 위해 사용 Ex. 부모가 렌더링되면 자식도 렌더링 됨
- memo의 원리 : props가 변할때만 재렌더링 해줌 -> props가 복잡하면 오래걸릴 수 있음
    ``` javascript
    // memo
    let Child = memo (function(){
        return <div>자식임</div>
    }) // 꼭 필요할때만 재렌더링할때 사용 / 재렌더링 오래걸리는 컴포넌트를 감싸주면 좋음

    function 함수(){
        ... // 복잡한 연산을 return하는 함수
    }
    function Parent(){

        let result = 함수()
        useMemo(()=>{ return 함수()},[state]) // 컴포넌트 렌더링시 1회만 실행함, state추가시 state가 변할때만 실행함

        return (
            ...
            <Child/>
            ...
            )
    }
    ```

### batch, useTransition, useDefferredValue
#### batch
  - state변경함수를 연달아서 3개 사용하면 재렌더링도 원래 3번 되어야하지만 
    리액트는 똑똑하게도 재렌더링을 마지막에 1회만 처리해줍니다. 
    일종의 쓸데없는 재렌더링 방지기능이고 batching이라고 함
  - ajax, setTimeout 내부라면 재렌더링이됨
#### useTransition, useDefferedValue
  - 렌더링이 매우 오래걸리는 컴포넌트를 쓰면 복잡한 연산을 나중에 처리해줌
    ``` javascript
    let a = new Array(10000).fill(0)
    function App(){
    let [name, setName] = useState('') 
    let [isPending, startTransition] = useTransition() // isPending은 startTransition이 처리중일 때 true로 변함

    let state = useDefferredValue(state) // 파라미터에 넣은 state를 느리게 처리해줌

    return (
        <div className="App">
        <input onChange={ (e)=>{ 
            startTransition(()=>{ // startTransition 안의 함수는 늦게 처리해줌
            setName(e.target.value)
            })
        }}/>
        {
            a.map(()=>{
            return <div>{name}</div>
            })
        }
        </div>
    )
    }
    ```

## React 라이브러리
### react-router-dom
- 라우팅용 라이브러리
- 설치 방법
    ```
    1. npm install react-router-dom
    2. index.js 에서 App컴포넌트를 <BrowerRouter><App/></BrowserRouter>로 감싸줌
    ```
- Routes, Route, Outlet, Link(링크이동), useNavigate(링크이동), useParams(url 파라미터)

### Styled-Components
- Component에 스타일을 입히기 위한 라이브러리
- 설치방법
    ```
    1. npm install styled-components
    2. index.js 에서 App컴포넌트를 <BrowerRouter></BrowserRouter>로 감싸줌
    ```
- 사용법
    ``` javascript
    import styled from 'styled-components'

    let YellowBtn = styled.button`
    background:${props => props.bg};
    color:${props => props.bg == 'blue' ? 'white' : 'black'};
    padding:10px;`

    let NewBtn = styled.button(YellowBtn)`
    color:red;
    `

    <YellowBtn bg='blue'>버튼</YellowBtn>
    <YellowBtn bg='orange'>버튼</YellowBtn>
    <NewBtn>버튼</NewBtn>
    ```

### Axios 
- AJAX 요청을 하기 위해 사용하는 라이브러리
- 사용방법
  - npm install axios
    ``` javascript
    // GET
    axios.get('url')
    .then((result)=>{
        console.log(result.data)
        })
    .catch((error)=>{
        console.log(error)
        })

    // POST
    axios.post('url',{data})

    // 여러 곳에 요청
    Promise.all([axios.get('/url1'), axios.get('/url2')])
    .then((result)=>{
        console.log(result)
    })
    ```

### Redux Toolkit
- 컴포넌트들 간 props 없이 state 공유 가능
- 사용방법
1. npm install @reduxjs/toolkit react-redux
2. store.js 파일 생성
3. 
    ``` javascript
    // index.js
    <Provider store={store}> // store.js 의 state 공유
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>

    // store.js
    import { configureStore, createSlice } from '@reduxjs/toolkit'
    import user from './store/uesrSlice.js'



    let cart = createSlice({ // useState의 역할을 하는 함수
        name: 'cart', // state명
        initialState: [ // 값
            { id: 0, name: 'White and Black', count: 2 },
            { id: 2, name: 'Grey Yordan', count: 1 }
        ],
        reducers: { // 여러개의 state 변경 함수를 만들 수 있음.
            changeCount(state, action) { // state 수정 함수 선언
                let 번호 = state.findIndex((a) => { return a.id == action.payload })
                state[번호].count++;
            },
            addItem(state, action) { // action에 신규 state를 넣을 수 있음
                state.push(action.payload) // action.payload를 해야 state 값이 나옴, action엔 다양한 정보가 저장되어 있음
            }
        }
    })

    export let { changeCount, addItem } = cart.actions // state 변경 함수 export

    export default configureStore({
        reducer: { // 여기에 state를 등록해야 사용가능
            cart: cart.reducer
        }
    }) 

    // Cart.js
    import { useDispatch, useSelector } from 'react-redux';
    import { changeCount } from '../store.js'

    let dispatch = useDispatch(); // store.js로 요청을 보내는 함수

    function Cart(){
        let state = useSelector((state) => state); // Redux store의 state 꺼내는법 / 파라미터 : 모든 state return 에 'state.state이름'으로 작성하면 필요한 state만 뽑아 쓸 수 있음
        ...
        <h6>{state.user.name}{state.user.age}의 장바구니</h6>
        ...
        <button onClick={() => {
            dispatch(changeCount(10)) // state 변경함수 사용하는 방식
        }}>버튼</button>
        ...
    }
    ```

### React-Query 
- 실시간 데이터를 계속 가져와야하는 사이트들이 사용함(SNS, 코인거래소 등)
- 장점
  1. 성공/실패/로딩중 여부 쉽게 파악 가능
  2. 틈만나면 자동으로 refetch를 해줌
  3. 실패시 retry 해줌
  4. state 공유를 안 해도 됨
- 사용방법
1. npm install @tanstack/react-query
    ``` javascript
    // index.js
    import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query' 
    <QueryClientProvider client={queryClient}>
        <App/>
    </QueryClientProvider>

    // app.js
    function App(){
    let result = useQuery('작명', ()=>
        axios.get('url')
        .then((a)=>{ return a.data }),
        {staleTime: 2000} // refetch 시간 설정
    )
    }

    // Boolean
    result.data // 결과
    result.isLoading // 로딩중
    result.error // 실패
    ```

## JSX 문법
- class 넣을땐 className, css경로 설정 잘해주어야함
- 데이터바인딩을 할 땐 { 변수명 }
- style을 인라인으로 작성할땐 style = { {color : red, fontSize:'160px } } 오브젝트 자료형처럼 넣어야 함
- tag를 열어주었으면 꼭 닫아주어야함.

## 동적 UI step
1. html, css로 미리 디자인 완성
2. UI의 현재 상태를 state로 저장
3. state에 따라 UI가 어떻게 보일지 작성

## PWA(Progressive Web App)
- 웹브라우저를 앱처럼 사용할 수 있게 해주는 기능
- 장점
  1. 설치 마케팅 비용이 적음
  2. 아날로그 유저 배려
  3. HTML, CSS, JS만으로 앱구현 가능
  4. 푸시알림, 자이로 센서와 같은 기능 사용 가능
- 사용방법(React)
    ``` json
    // public폴더 내의 mainfet.json 생성
    {
    "version" : "여러분앱의 버전.. 예를 들면 1.12 이런거",
    "short_name" : "설치후 앱런처나 바탕화면에 표시할 짧은 12자 이름",
    "name" : "기본이름",
    "icons" : { "여러가지 사이즈별 아이콘 이미지 경로" },
    "start_url" : "앱아이콘 눌렀을 시 보여줄 메인페이지 경로",
    "display" : "standalone 아니면 fullscreen",
    "background_color" : "앱 처음 실행시 잠깐 뜨는 splashscreen의 배경색",
    "theme_color" : "상단 탭색상 등 원하는 테마색상",
    }
    ```

## Javscript 문법
### map함수의 특징
1. Array의 자료 갯수만큼 함수안의 코드를 실행해줌
2. 함수의 첫번째 파라미터는 Array안의 자료임, 두번째 파라미터는 인덱스
3. return값을 적어주면 array에 담아줌

### import / export 방법
- 함수, 변수를 다른 파일에서 사용 가능
#### import
-  import 경로
-  import 작명 from '경로'
-  ㅑmport {변수1, 변수2} from '경로'

#### export
- export default 변수명
- export {변수1, 변수2}

### react에서 자주 사용하는 if 문 패턴 5개
1. 컴포넌트 안에서 쓰는 if/else
   ``` javascript
   function Component(){
    if (true) {
        return <p>참이면 보여줄 HTML</p>
    }
    return null
   }
   ```

2. JSX안에서 사용하는 삼항연산자
    ``` javascript
    function Component() {
    return (
        <div>
        {
            1 === 1
            ? <p>참이면 보여줄 HTML</p>
            : null
        }
        </div>
    )
    } 
    ```

3. &&연산자
- 왼쪽 오른쪽 둘다 true면 전체가 true
    ``` javascript
    true && ture; // true
    true && false; // false
    true && '안녕'; // '안녕'
    false && '안녕'; // false
    ture && false && '안녕' // false

    // React
    function Component() {
        return (
            <div>
            { 1 === 1 && <p>참이면 보여줄 HTML</p> }
            </div>
        )
    }
    ```

4. switch / case 조건문
    ``` javascript
        function Component2(){
        var user = 'seller';
        switch (user){
            case 'seller' :
            return <h4>판매자 로그인</h4>
            case 'customer' :
            return <h4>구매자 로그인</h4>
            default : 
            return <h4>그냥 로그인</h4>
        }
        }
    ```

5. Object / Array 자료형 응용
    ``` javascript
    var 탭UI = { 
        info : <p>상품정보</p>,
        shipping : <p>배송관련</p>,
        refund : <p>환불약관</p>
        }

    function Component() {
    var 현재상태 = 'info';
    return (
            <div>
            {
                탭UI[현재상태]
            }
            </div>
        )
    } 
    ```

### localStorage(영구지속) / sessionStorage(브라우저 종료시 종료) 사용방법
``` javascript
localStorage.setItem('데이터이름', '데이터'); // 추가
localStorage.getItem('데이터이름'); // 읽기
localStorage.removeItem('데이터이름') // 삭제
```
## 배포
### Process
1. 배포하기 전 체크할 사항
   1. 콘솔창, 터미널에 에러가 발생하는지?
   2. 배포할 사이트 경로가 알맞게 설정되어있는지 확인하기  
    [리액트 배포](https://create-react-app.dev/docs/deployment/#building-for-relative-paths)
2. 터미널에 build 명령어 입력
``` javascript
 npm run build
```
3. build 폴더 안에 있는 내용물을 서버에 업로드
### TIP
1. 첫 페이지 로딩 속도를 빠르게 하는 방법
   - 컴포넌트를 lazy하게 로딩하는 방법 채택
   - 공식 홈페이지 [lazy](https://legacy.reactjs.org/docs/code-splitting.html#route-based-code-splitting)함수
2. 업데이트 사항이 생길 경우
    - 다시 build해서 업로드하면 됨
3. build 할 때 압축 시키지 말고 남기고 싶은 파일이 있는 경우
    - public폴더에 넣고 build하면 됨.
    - public폴더에 보관하고 ./ 경로가 아닌 / 경로로 import해야함 