import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
function Detail(props){
    let [num, setNum] = useState('');
    useEffect(()=>{
        if(isNaN(num)==true){window.alert('그러지마세요'); }
        let timer = setTimeout(()=>{setAlert(alert=false);},3000)
        return ()=>{clearTimeout(timer)} //타이머 기능 제거해주는 함수이다. return은 기존코드 치워주는건데 백만개 생성될 타이머 밀고 useEffect실행해주세요
    }
    , [num])
    let [count,setCount] = useState(3);
    let [alert, setAlert] = useState(true);
    let {id} =  useParams();
    let index =props.shoe.find( function(i){return i.id == id});
    let [tab, setTab] = useState(0);
    
    return (
      <div className="container">
        {alert==true ?  <div className="alert alert-warning">{count}초이내 구매시 할인</div> : null}
          <div className="row">
              <div className="col-md-6">
                  <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" alt="" />
              </div>
              <div className="col-md-6">
                  <h4 className="pt-5">{index.title}</h4>
                  <p>{index.content}</p>
                  <p>{index.price}</p>
                  <input onChange={(e)=>{setNum(e.target.value)}} />
                  <button className="btn btn-danger">주문하기</button> 
              </div>
          </div>

          <Nav variant="tabs"  defaultActiveKey="link0">
            <Nav.Item>
                <Nav.Link eventKey="link0" onClick={()=>{setTab(tab=0)}}>버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link1" onClick={()=>{setTab(tab=1)}}>버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link2" onClick={()=>{setTab(tab=2)}}>버튼2</Nav.Link>
            </Nav.Item>
        </Nav>
        <TabContent tab={tab}/>
      </div>
)
}

function TabContent(props){
    if(props.tab==0){
        return <div>내용0</div>
    }else if(props.tab==1){
        return <div>내용1</div>
    }else if(props.tab==2){
        return <div>내용2</div> 
    }

}


export default Detail;