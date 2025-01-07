import { useState } from 'react'
import './App.css'
import {Navbar, Container, Nav} from 'react-bootstrap';
import data from './data';
function App() {

  let [shoes] = useState(data);
  
  return (
    <>
      <div>
        <Navbar bg="black" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">React Store</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">products</Nav.Link>
              <Nav.Link href="#pricing">items</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

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
    </>
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

export default App
