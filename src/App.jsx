import { createContext, useEffect, useState } from 'react'
import './App.css'
import {Navbar, Container, Nav,} from 'react-bootstrap';
import data from './data';
import Detail from './routes/Detail';
import Event from './routes/Event';
import {Routes, Route, Link ,useNavigate, Outlet} from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Cart from './routes/Cart';
export let Context1 = createContext();

function App() {
  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify([]))
  })
  let [shoes, setShoes] = useState(data);
  let [stock, setStock] = useState([10,11,12]);
  let [originData] = useState(data);
  let navigate = useNavigate();
  let [num, setNum] = useState(2);
  let [show, setShow] = useState(true);
  let [loading, setLoading] = useState(<Spinner animation="border" />);
  
  return (
    <>
      <div>
{/* ------navbar------ */}

        <Navbar bg="black" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">React Store</Navbar.Brand>
            <Nav className="me-auto">
              <Link className="linkButton" to="/">홈</Link>
              <Link className="linkButton" to="/detail">Detail</Link>
              <Link className="linkButton" to="/cart">cart</Link>

              
              {/* 
              navigate함수임! : 페이지를 이동시켜준다
              <button onClick={()=>{navigate('/detail')}} className="linkButton">Detail</button> */}
            </Nav>
          </Container>
        </Navbar>
        <Link to = "/event"></Link>
{/* ------라우터------ */}
        <Routes>
          <Route path="/" element={
            <div>
              <button onClick={()=>{
                let copy = [...shoes];
                copy.sort((a,b)=> a.title.toUpperCase() < b.title.toUpperCase()? -1 : 1);
                setShoes(copy);
              }}
              >가나다순 정렬</button>
              <button onClick={()=>{
                setShoes(originData);
              }}>되돌리기</button>
              <div className="main-bg"></div>
                <div className="image-gallery">
                  {shoes.map(function(a, i) {
                    return (
                      <div key={i} className="image-item">
                        <Card data={shoes[i]} i={i+1}/>
                      </div>)})}
                </div>
                
                {show == true? 
                <button onClick={()=>{
                  setNum(num+1);
                  axios.get(`https://codingapple1.github.io/shop/data${num}.json`)
                  .then((결과)=>{
                    console.log(결과.data);
                    let shoe = [...shoes, ...결과.data];
                    setShoes(shoe);
                  })
                  .catch((결과)=>{
                    console.log(결과.data);
                    if(typeof 결과.data=="undefined"){setShow(false)}
                    console.log('실패함ㅅㄱ');
                  })
                  // 여러개 get요청할때 Promise.all을 쓰면 된다.
                  // Promise.all([axios.get('/url1'), axios.get('/url2')])
                  // .then()
                  // .catch()
                }}>더보기</button>
                 : null}
            </div>
          }/>
          <Route path="/detail" element={
            <div>
                <div className="image-gallery">
                  {shoes.map(function(a, i) {
                    return (
                      <div key={i} className="image-item">
                        <Card data={shoes[i]} i={i+1}/>
                      </div>)})}
                </div>
                
                {show == true? 
                <button onClick={()=>{
                  setNum(num+1);
                  axios.get(`https://codingapple1.github.io/shop/data${num}.json`)
                  .then((결과)=>{
                    console.log(결과.data);
                    let shoe = [...shoes, ...결과.data];
                    setShoes(shoe);
                  })
                  .catch((결과)=>{
                    console.log(결과.data);
                    if(typeof 결과.data=="undefined"){setShow(false)}
                    console.log('실패함ㅅㄱ');
                  })
                  // 여러개 get요청할때 Promise.all을 쓰면 된다.
                  // Promise.all([axios.get('/url1'), axios.get('/url2')])
                  // .then()
                  // .catch()
                }}>더보기</button>
                 : null}
            </div>
          }/>
          <Route path="/detail/:id" element={
            <Context1.Provider value={{stock, shoes}}>
              <Detail shoe={shoes}/>
            </Context1.Provider>
            }></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          {/* Nested Routes : 태그안에 태그가 들어간 라우터 형식, /about/member, /about/location 을 뜻함 */}
          <Route path="/about" element={<About/>}>
            <Route path ="member" element={<div>멤버임</div>}/>
            <Route path ="location" element={<div></div>}/>
          </Route>

          <Route path="/event" element={<Event/>}>
            <Route path = "one" element={<div>첫 주문시 양배추즙 서비스</div>}></Route>
            <Route path = "two" element={<div>생일기념 쿠폰받기</div>}></Route>
          </Route>

          <Route path="/cart" element={<Cart/>}></Route>
        </Routes>

      
    </div>
    </>
  )
}

{/* ------Card컴포넌트------ */}
function About(){
  return(
    <div>
      <h4>회사정보임</h4>
      {/* Outlet : 구멍이라는 뜻임, Nested Routes된 애들을 어디에 보여줄지를 결정해줌 */}
      <Outlet></Outlet>
    </div>

  )
}



function Card(props){
    return(
      <div className="col-md-4">
        <Link to ={`/detail/${props.i-1}`}>
        <img src={`https://codingapple1.github.io/shop/shoes${props.i}.jpg`} width="80%" alt="description of the image" />
        </Link>
        <h4>{props.data.title}</h4>
        <p>{props.data.price}</p>
      </div>
    )
  }

export default App;
