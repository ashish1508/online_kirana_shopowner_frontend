import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import FlatList from 'flatlist-react';
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux';

import { getorders,makecurrent } from '../redux/actions';
import classes from './ViewOrder.css'


class ViewOrder extends Component {
  state={

  }



  async componentDidMount() {
   
  }

  orderCompleteHandler=()=>{
    let  details = jwt_decode(this.props.token.token)
    console.log(details)
          fetch('https://floating-inlet-91907.herokuapp.com/api/orders/updatestatus',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                 
                  orderid:this.props.orders.current_order.id,
                  status:"PACKED"
              })
        })
        .then(response=>response.json())
        .then(json =>{
         console.log(json)
        })
   // this.props.history.push("/")
  }

  acceptOrderHandler=()=>{
    let  details = jwt_decode(this.props.token.token)
    console.log(details)
          fetch('https://floating-inlet-91907.herokuapp.com/api/orders/updatestatus',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  
                  orderid:this.props.orders.current_order.id,
                  status:"ACCEPTED"
              })
        })
        .then(response=>response.json())
        .then(json =>{
         console.log(json)
        })
       // this.props.history.push("/")
  }
  orderDeliveredHandler=()=>{
    let  details = jwt_decode(this.props.token.token)
    console.log(details)
          fetch('https://floating-inlet-91907.herokuapp.com/api/orders/updatestatus',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  
                  orderid:this.props.orders.current_order.id,
                  status:"DELIVERED"
              })
        })
        .then(response=>response.json())
        .then(json =>{
         console.log(json)
        })
       // this.props.history.push("/")
  }
 
  render() {
   
    return (

        <div style={{flex:1}}>
          <div  style={{backgroundColor:"yellow",margin:"2%"}}>
            {this.props.orders.current_order.items.map((item,index) => {
             return( <div key = {index}>
                  <p>{item.name}</p>

                  {item.variants.map((variant,varind) => {
                   return( <div key = {varind} style={{display:"flex",flexDirection:"row"}}>
                        <p>{variant.quantity}</p>
                        <p>{variant.price}</p>
                        <p>{variant.quant}</p>
                    </div>)
                  })}

              </div>)
            })}
          </div>

        <div   className={classes.OrderButton}>
            <div style={{position:"absolute",left:10}}>TOTAL : &#8377;{this.props.orders.current_order.total}</div>        
        {this.props.orders.current_order.status==="NEW" && 
        <div 
        onClick = {() => this.acceptOrderHandler()}
        style={{position:"absolute",right:40}}>ACCEPT ORDER</div> }

        {this.props.orders.current_order.status==="ACCEPTED" && 
        <div 
        onClick = {()=>this.orderCompleteHandler()}
        style={{position:"absolute",right:40}}>ORDER COMPLETED</div> }

        {this.props.orders.current_order.status==="PACKED" && 
        <div 
        onClick = {()=>this.orderDeliveredHandler()}
        style={{position:"absolute",right:40}}>ORDER DELIVERED</div> }

        </div>


        </div>


        
    );
  }
}
const mapStateToProps = state => ({
    orders:state.order,
    token:state.token
  });
  
  
  const mapDispatchToProps = dispatch => ({
    get_orders : (data) => dispatch(getorders(data)),
    make_currrent : (data) => dispatch(makecurrent(data))
  });

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewOrder));
