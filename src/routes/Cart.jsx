import React from 'react'
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { changeName,changeAge } from '../store';

const Cart = () => {
  let a = useSelector((state)=>{return state})
  let dispatch = useDispatch();
  
  return (
    <div>
      {a.user.name}{a.user.age}의 장바구니
      <button onClick={()=>{dispatch(changeAge(100))}}>버튼</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            a.cart.map(function(item,i){
              return(
              <tr key={item.id}>
                <td>{i+1}</td>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>
                  <button onClick={()=>{dispatch(changeName())}}>+</button>
                </td>
              </tr>
              )})
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Cart