import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { cart } from '../redux/actions';
import { connect } from 'react-redux';
import Lottie from 'react-lottie';
import * as animationData from '../animations/greentick.json'

import classes from './Order.css'

import * as animData from '../animations/error404.json'
const defOptions = {
    loop: true,
    autoplay: true, 
    animationData: animData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
class Order extends Component {
  state={

  }
  calcprice=()=>{
    const ele=this.props.cart.length
    let price=0
    if(ele!==0){
        this.props.cart.map(i =>{
            price=price+(i.quantity*i.price)
            return 0;
        })
        this.setState({price:price})
    }
}
  async componentDidMount() {
    this.calcprice()
  }
 
  render() {
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    if(this.props.cart.length===0){
        return(
            <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center"}}>
            <Lottie options={defOptions}
            height={200}
            width={200}/>
            </div>
        )
    }
    return (

        <div style={{flex:1}}>
        <div style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Lottie options={defaultOptions}
        height={200}
        width={200}/>
        <div style={{borderRadius:5,display:'flex',flex:1,width:"80%",height:"40px",backgroundColor:"green",alignItems:"center",justifyContent:"center",marginLeft:"10%",marginRight:"10%"}}>
             <p style={{color:"white",fontWeight:"bold"}}>ORDER ID : {this.props.order.id}</p>
         </div>
         <div style={{borderRadius:5,display:'flex',flex:1,width:"80%",height:"40px",backgroundColor:"blue",alignItems:"center",justifyContent:"center",marginLeft:"10%",marginRight:"10%"}}>
             <p style={{color:"white",fontWeight:"bold"}}>TOTAL : {this.state.price}</p>
         </div>
        </div>

         {
            this.props.cart.map((i,index) => {
                return(
                    <div key={index} style={{flex:1}}>
                        <div className={classes.Child} style={{backgroundColor:'#26D701'}}> 
                            <div className={classes.Subchild}>
                            <p style={{'fontWeight':'bold'}}>{i.name}</p>
                            <p>&#8377;{i.price}</p>
                            </div>
                            <div className={classes.Quan}>
                                <p style={{'fontWeight':'bold'}}>Qty:{i.quantity}</p>
                                </div>
                        </div>
                       
                    </div>
                )
            })
        }
        </div>
        
    );
  }
}
const mapStateToProps = state => ({
    cart: state.cart,
    order:state.order
  });
  
  
  const mapDispatchToProps = dispatch => ({
    to_cart:(payload) => dispatch(cart(payload))
  });

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Order));
