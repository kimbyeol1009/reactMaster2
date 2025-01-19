import { useState } from 'react'
import './App.css'
import {Navbar, Container, Nav,} from 'react-bootstrap';
import data from './data';
import Detail from './routes/Detail';
import Event from './routes/Event';
import {Routes, Route, Link ,useNavigate, Outlet} from 'react-router-dom';
import axios from 'axios';

function App() {

  let [shoes, setShoes] = useState(data);
  let [originData] = useState(data);
  let navigate = useNavigate();
  
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
              
              {/* 
              navigate함수임! : 페이지를 이동시켜준다
              <button onClick={()=>{navigate('/detail')}} className="linkButton">Detail</button> */}
            </Nav>
          </Container>
        </Navbar>
        <Link to = "/event"></Link>
{/* ------라우터------ */}
        <button onClick={()=>{
          let copy = [...shoes];
          copy.sort((a,b)=> a.title.toUpperCase() < b.title.toUpperCase()? -1 : 1);
          setShoes(copy);
        }}
        >가나다순 정렬</button>
        <button onClick={()=>{
          setShoes(originData);
        }}>되돌리기</button>
        <Routes>
          <Route path="/" element={
            <div>
              <div className="main-bg"></div>
                <div className="image-gallery">
                  {shoes.map(function(a, i) {
                    return (
                      <div key={i} className="image-item">
                        <Card data={shoes[i]} i={i+1} />
                      </div>)})}
                </div>
                <button onClick={()=>{
                  axios.get('https://codingapple1.github.io/shop/data2.json')
                  .then((결과)=>{
                    console.log(결과.data);
                    let shoe = [...shoes];
                    setShoes(shoe.concat(결과.data))
                  })
                  .catch(()=>{
                    console.log('실패함ㅅㄱ');
                  })

                }}>버튼</button>
            </div>
          }/>
          <Route path="/detail/:id" element={<Detail shoe={shoes}/>}>
          </Route>
          
         

          {/* Nested Routes : 태그안에 태그가 들어간 라우터 형식, /about/member, /about/location 을 뜻함 */}
          <Route path="/about" element={<About/>}>
            <Route path ="member" element={<div>멤버임</div>}/>
            <Route path ="location" element={<div></div>}/>
          </Route>

          <Route path="/event" element={<Event/>}>
            <Route path = "one" element={<div>첫 주문시 양배추즙 서비스</div>}></Route>
            <Route path = "two" element={<div>생일기념 쿠폰받기</div>}></Route>
          </Route>

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
        <img src={'https://codingapple1.github.io/shop/shoes'+props.i+'.jpg'} width="80%" alt="description of the image" />
        <h4>{props.data.title}</h4>
        <p>{props.data.price}</p>
      </div>
    )
  }

export default App;
