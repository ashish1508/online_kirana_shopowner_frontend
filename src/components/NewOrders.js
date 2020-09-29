import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import FlatList from 'flatlist-react';
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux';

import { getorders,makecurrent } from '../redux/actions';
import classes from './Order.css'

import * as animData from '../animations/error404.json'

let Orders = [
  {
    orderby:"dhoni@gmail.com",
    orderto:"zak@gmail.com",
    total:60,
    status:"NEW",
    message:"none",
    items: [
      {"__v": 0, 
      "_id": "5f16dfc5f1cc260017efd8c4", 
      "categoryid": "5f0ad96414bb530017dbfe04",
      "def_id": 0, "id": "5f16dfc5f1cc260017efd8c4",
      "imageurl": "https://bit.ly/3gpcSMI",
      "name": "Lays",
      "nameshopid": 
      "Layszak@gmail.com",
      "shopid": "zak@gmail.com",
      "total_quant": 2, 
      "variants": [{"quantity":10,"price":30,"quant":2}]
     },
     {"__v": 0, 
     "_id": "5f16dfc5f1cc260017efd8c4", 
     "categoryid": "5f0ad96414bb530017dbfe04",
     "def_id": 0, "id": "5f16dfc5f1cc260017efd8c4",
     "imageurl": "https://bit.ly/3gpcSMI",
     "name": "Munch",
     "nameshopid": 
     "Munchzak@gmail.com",
     "shopid": "zak@gmail.com",
     "total_quant": 2, 
     "variants": [{"quantity":30,"price":25,"quant":2},{"quantity":70,"price":75,"quant":4}]
    }
    ]
  },
  {
    orderby:"dhoni@gmail.com",
    orderto:"zak@gmail.com",
    total:350,
    status:"ACCEPTED",
    message:"none",
    items: [
      {"__v": 0, 
      "_id": "5f16dfc5f1cc260017efd8c4", 
      "categoryid": "5f0ad96414bb530017dbfe04",
      "def_id": 0, "id": "5f16dfc5f1cc260017efd8c4",
      "imageurl": "https://bit.ly/3gpcSMI",
      "name": "Munch",
      "nameshopid": 
      "Munchzak@gmail.com",
      "shopid": "zak@gmail.com",
      "total_quant": 2, 
      "variants": [{"quantity":30,"price":25,"quant":2},{"quantity":70,"price":75,"quant":4}]
     }
    ]
  },

]
class Order extends Component {
  state={

  }

  getOrders = () => {
   console.log("***********")
   let  details = jwt_decode(this.props.token.token)
    console.log(details)
    fetch('https://floating-inlet-91907.herokuapp.com/api/orders/getordersbyshopid',{
      method:'POST',
      headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shopid:details.email,
            status:"NAP"
        })
  })
  .then(response=>response.json())
  .then(json =>{
   console.log(json)
   this.props.get_orders(json.Orders)
  })
    //this.props.get_orders(Orders)

  }

  async componentDidMount() {
   this.getOrders()
  }

  // renderOrder = (order, idx) => {
  //   return (
        
  //         <div key={idx} style={{backgroundColor:"yellow",margin:"2%"}}>
  //           {order.items.map((item,index) => {
  //            return( <div key = {index}>
  //                 <p>{item.name}</p>

  //                 {item.variants.map((variant,varind) => {
  //                  return( <div key = {varind} style={{display:"flex",flexDirection:"row"}}>
  //                       <p>{variant.quantity}</p>
  //                       <p>{variant.price}</p>
  //                       <p>{variant.quant}</p>
  //                   </div>)
  //                 })}

  //             </div>)
  //           })}
  //         </div>
     
  //   );
  // }

  handleOrderClick = (index) => {
    console.log("orderclick")
      this.props.make_current(this.props.orders.all_orders[index])
      this.props.history.push("/vieworder")
  }

  renderOrder = (order,idx) => {
    
      if(order.status==="NEW"){
        return(      
        <div
          onClick = {() => this.handleOrderClick(idx)}
          key = {idx} style={{backgroundColor:"green"}}
         >
           NEW ORDER
        </div>)
      }
      if(order.status==="ACCEPTED"){
        return(      
        <div
          onClick = {() => this.handleOrderClick(idx)}
          key = {idx} style={{backgroundColor:"yellow"}}
         >
           ACCEPTED ORDER
        </div>)
      }
      if(order.status==="PACKED"){
        return(      
        <div
          onClick = {() => this.handleOrderClick(idx)}
          key = {idx} style={{backgroundColor:"blue"}}
         >
           PACKED ORDER
        </div>)
      }

    
  }
 
  render() {
    console.log("ALLOrders",this.props.orders)
    return (

        <div style={{flex:1}}>
             
                <FlatList
                  list={this.props.orders.all_orders}
                  renderItem={this.renderOrder}
                  renderWhenEmpty={() => <div>List is empty!</div>}
                />
        </div>
        
    );
  }
}
const mapStateToProps = state => ({
    token: state.token,
    orders:state.order
  });
  
  
  const mapDispatchToProps = dispatch => ({
    get_orders : (data) => dispatch(getorders(data)),
    make_current : (data) => dispatch(makecurrent(data))
  });

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Order));
