import React,{Component} from 'react'
import { connect } from 'react-redux';
import { cart,setorderid } from '../redux/actions';

import classes from './Cart.css'
import {withRouter} from 'react-router-dom'
import {hosturl} from '../config'
import Lottie from 'react-lottie';
import * as animationData from '../anime/empty.json'
const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

class Cart extends Component{
    state={
        failed:[],
        id:-1
    }

    orderHandler=()=>{
        
        fetch(hosturl+'/order/all',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  order:this.props.cart
              })
        })
        .then(response=>response.json())
        .then(json =>{
            this.props.set_order_id(json.order_id)
            if(json.failed.length===0){
                this.props.history.push('/order')
            }
            this.setState({failed:json.failed})
        })
    }

    addtoCart=(item,price,index)=>{
        let i=-1

        for(let k=0;k<this.props.cart.length;k++){
            if(this.props.cart[k].name===item){
                i=k
                break
            }
        }

        let newglobalcart = [...this.props.cart]
        if(i===-1){
            const data={
                cat_id:this.state.cat_id,
                name:item,
                price:price,
                quantity:1
            }
            newglobalcart.push(data)
        }
        else{
            newglobalcart[i].quantity += 1
        }
        
        this.props.to_cart(newglobalcart)
        this.calcprice()
    }

    removefromCart=(item,price,index)=>{
        let i=-1

        for(let k=0;k<this.props.cart.length;k++){
            if(this.props.cart[k].name===item){
                i=k
                break
            }
        }


        let newglobalcart = [...this.props.cart]
        
        newglobalcart[i].quantity -= 1
        if(newglobalcart[i].quantity===0)
            newglobalcart.splice(i,1)
        
        this.props.to_cart(newglobalcart)
        this.calcprice()
    }

    gotoCat=()=>{
        this.props.history.push('/categories')
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
    componentDidMount(){
        this.calcprice()
    }

    render(){
        const ele=this.props.cart.length


        if(ele===0){
            return(
                <div>
                    <header className={classes.Header}>
                        <h2>CART</h2>
                    </header>
                    <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Lottie options={defaultOptions}
                        height={200}
                        width={200}/>
                        </div>
                    <p className={classes.Empty}>
                        Cart is empty!
                    </p>
                    <div onClick={()=>this.gotoCat()} className={classes.GotoButton}>
                        --Click here to add--
                    </div>
                </div>
            )
        }

        return(

            <div>
            <div className={classes.Parent}>
                <header className={classes.Header}>
                    <h2>CART</h2>
                </header>
                {
                    this.props.cart.map((i,index) => {
                        return(
                           
                            <div key={index}  style={{flex:1}}>
                            <div className={classes.Child} style={{backgroundColor:(i.type)===1?'#d21502':(i.type===2)?'#ffd300':'#2a8000'}}> 
                                <div className={classes.Subchild}>
                                <p style={{'fontWeight':'bold'}}>{i.name}</p>
                                <p>&#8377;{i.price}</p>
                                </div>

                            
                            <div className={classes.Box}>
                                <div className={classes.Boxchild} onClick={()=>this.removefromCart(i.name,i.price,index)}>
                                    -
                                </div>
                                <div className={classes.Boxchild}>
                                    {i.quantity}
                                </div>
                                <div className={classes.Boxchild} onClick={()=>this.addtoCart(i.name,i.price,index)}>
                                    +
                                </div>
                                
                            </div>
                            {
                                (this.state.failed.length!==0 && this.state.failed[index].error===1) &&
                                (
                                <div className={classes.Error} style={{borderWidth:3}}>
                                    <p style={{fontSize:15,marginTop:'10px'}}>Max qty available for {this.state.failed[index].name} is {this.state.failed[index].avail_quantity}</p>
                                   
                                 </div>
                                 )
                            }
                            </div>

                            </div>
                        )
                    })
                }
                
            </div>


                <div onClick={()=>this.orderHandler()}  className={classes.OrderButton}>
                <div style={{position:"absolute",left:10}}>TOTAL : &#8377;{this.state.price}</div>        
                <div style={{position:"absolute",right:40}}>ORDER NOW</div> 
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    cart: state.cart,
  });
  
  
  const mapDispatchToProps = dispatch => ({
    to_cart:(payload) => dispatch(cart(payload)),
    set_order_id:(id) =>dispatch(setorderid(id))
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));