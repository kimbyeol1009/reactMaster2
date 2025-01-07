import { useState } from 'react'
import './App.css'
import {Navbar, Container, Nav,} from 'react-bootstrap';
import data from './data';
import Detail from './routes/Detail';
import {Routes, Route, Link ,useNavigate, Outlet} from 'react-router-dom';


function App() {

  let [shoes] = useState(data);
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

{/* ------라우터------ */}

        <Routes>
          <Route path="/" element={
            <div>
              <div className="main-bg"></div>
                <div className="image-gallery">
                  {
                    shoes.map(function(a, i) {
                      return (
                        <div key={i} className="image-item">
                          <Card data={shoes[i]} i={i+1} />
                        </div>
                      )
                    })
                  }
                </div>
            </div>
            }/>
          <Route path="/detail" element={<Detail/>}/>

        </Routes>

      
    </div>
    </>
  )
}

{/* ------Card컴포넌트------ */}

function Card(props){
    return(
      <div className="col-md-4">
        <img src={'https://codingapple1.github.io/shop/shoes'+props.i+'.jpg'} width="80%" alt="description of the image" />
        <h4>{props.data.title}</h4>
        <p>{props.data.price}</p>
      </div>
    )
  }

export default App
