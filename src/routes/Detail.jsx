import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCartCnt, addCnt } from '../store';

function Detail(props){
    let [num, setNum] = useState('');
    let [fade2, setFade2] = useState('');
    let a = useSelector((state)=>{return state});
    let dispatch = useDispatch();

    let [recent, setRecent] = useState([]);
    useEffect(()=>{
        if(isNaN(num)==true){window.alert('그러지마세요'); }
        let timer = setTimeout(()=>{setAlert(alert=false);},3000)
        setFade2('end')
        //최근본상품 id localStorage에 저장하는 코드
        let watched = localStorage.getItem('watched')
        watched = watched ? watched = JSON.parse(watched) :[]
        watched.push(index.id)
        watched.unshift(index.id)

        //Set으로 바꿨다가 다시 array로 만들기
        watched = new Set(watched)
        watched = Array.from(watched)
        localStorage.setItem('watched', JSON.stringify(watched))
        setRecent(watched);
        return ()=>{clearTimeout(timer); setFade2('');} //타이머 기능 제거해주는 함수이다. return은 기존코드 치워주는건데 백만개 생성될 타이머 밀고 useEffect실행해주세요
    }
    , [num])
    let [count,setCount] = useState(3);
    let [alert, setAlert] = useState(true);
    let [modal, setModal] = useState(false);
    let {id} =  useParams();
    let index =props.shoe.find( function(i){return i.id == id});
    let [tab, setTab] = useState(0);
    return (
        <div className={`container start ${fade2}`}>
        {alert==true ?  <div className="alert alert-warning my-3 ">{count}초이내 구매시 할인</div> : null}
          <div className="row">
              <div className="col-md-6">
                  <img src={`https://codingapple1.github.io/shop/shoes${index.id+1}.jpg`} width="100%" alt="nope" />
              </div>
              <div className="col-md-6">
                  <h4 className="pt-5">{index.title}</h4>
                  <p>{index.content}</p>
                  <p>{index.price}</p>
                  <input onChange={(e)=>{setNum(e.target.value)}} />
                  <button className="btn btn-danger" 
                  onClick={(id)=>{
                    dispatch(addCartCnt({id : index.id,name : index.title, count : Number(num)}));
                    setModal(modal=true);
                    setTimeout(()=>{setModal(modal=false)},3000);
                }}>주문하기</button>
                {/* 최근 본 상품 ui만들기 */}
                <div className='cartBox'>
                  <p className='topBox'>Cart</p>
                  <p style={{textAlign:'center'}}>최근 본 상품</p>
                  {recent.map(function(a,i){ return(<div key={i} className='recent-content'>
                  <img src={`https://codingapple1.github.io/shop/shoes${Number(a)+1}.jpg`} width="100%" height="100%" alt="nope" />
                  </div>)})}

                </div>
                {
                  modal == true ? <div className="alert alert-light my-3 col-6">{index.title}가 장바구니에 담겼습니다!</div> : null
                }
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

function TabContent({tab}){
   
    {/* if(props.tab==0){
        return <div>내용0</div>
    }else if(props.tab==1){
        return <div>내용1</div>
    }else if(props.tab==2){
        return <div>내용2</div> 
    } */}
    let [fade, setFade]=useState('');
    useEffect(()=>{
        setTimeout(()=>{setFade('end');},100)
        return()=>{
            setFade('');
        }
    }, [tab])
    return <div className={`start ${fade}`}>
        {[<div>내용0</div>,<div>내용1</div>,<div>내용2</div>][tab]}
    </div>
}


export default Detail;