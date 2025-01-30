import React from 'react'
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import {changeCnt, removeItem } from '../store';

const Cart = () => {
  let a = useSelector((state)=>{return state})
  let dispatch = useDispatch();
  
  return (
    <div>
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
                  <button className="button" onClick={(id)=>{dispatch(changeCnt(item.id))}}>+</button>
                  <button className="button2"
                  onClick = {(id)=>{dispatch(removeItem(item.id))}}>X</button>
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