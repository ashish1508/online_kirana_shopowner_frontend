import React,{Component} from 'react'
import { connect } from 'react-redux';
import { cart } from '../redux/actions';
import {withRouter} from 'react-router-dom'
import {hosturl} from '../config.js'
import classes from './Items.css'


import Lottie from 'react-lottie';
import * as animationData from '../anime/loading.json'

import { FaShoppingBasket } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa'
import { IconContext } from 'react-icons'


const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
class Items extends Component{
    state={
        data:[],
        cat_id:-1,
        admin:0,
        update:[],
        showmessage:false
    }

    componentDidMount(){
        const id=this.props.match.params.id
        let p = '/admin/'+id
        if(window.location.pathname===p){
            
            this.getItems(id,1)
        }else{
            this.getItems(id,0)
        }
    }
    getItems=(index,admin)=>{
        let url
        if(admin===1)
            url = hosturl + '/categories/all/admin/'+index
        else
         url = hosturl+'/categories/all/'+index
        fetch(url)
        .then(response =>{
            return response.json()
        })
        .then(json => {
            let allItems=json.items
            allItems.forEach((i,ind) =>{
                let f=0;
                i.cat_id = index
                this.props.cart.forEach(ip =>{
                    if(ip.name===i.name){
                        f=1;
                        
                        i.cart_q=ip.quantity
                    }
                })
                if(f===0){
                    i.cart_q=0
                }
            })
            this.setState({data:allItems , cat_id:index,admin:admin})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    addtoCart=(item,type,price,index)=>{
        let i=-1

        for(let k=0;k<this.props.cart.length;k++){
            if(this.props.cart[k].name===item){
                i=k
                break
            }
        }

        let newdata=[...this.state.data]
        newdata[index].cart_q+=1
        this.setState({data:newdata})

        let newglobalcart = [...this.props.cart]
        if(i===-1){
            const data={
                cat_id:this.state.cat_id,
                name:item,
                price:price,
                type:type,
                quantity:1
            }
            newglobalcart.push(data)
        }
        else{
            newglobalcart[i].quantity += 1
        }
        
        this.props.to_cart(newglobalcart)
    }

    removefromCart=(item,type,price,index)=>{
        let i=-1

        for(let k=0;k<this.props.cart.length;k++){
            if(this.props.cart[k].name===item){
                i=k
                break
            }
        }

        let newdata=[...this.state.data]
        newdata[index].cart_q-=1
        this.setState({data:newdata})

        let newglobalcart = [...this.props.cart]
        
        newglobalcart[i].quantity -= 1
        if(newglobalcart[i].quantity===0)
            newglobalcart.splice(i,1)
        
        this.props.to_cart(newglobalcart)
    }


    gotoCartHandler=()=>{
        this.props.history.push('/cart')
    }
    gotoCatHandler=()=>{
        this.props.history.push('/')
    }
    addtoUpdate=(ind)=>{
        let newupdate = [...this.state.update]
        let newdata = [...this.state.data]
        let flag=0
        for(let i=0;i<newupdate.length;i++){
            if(newupdate[i].name===newdata[ind].name){
                newupdate[i].quantity+=1
                flag=1
                break
            }
        }
        if(flag===0){
            newdata[ind].quantity+=1
            
            newupdate.push(newdata[ind])
        }
       

        this.setState({data:newdata,update:newupdate})
    }
    removefromUpdate=(ind)=>{
        let newupdate = [...this.state.update]
        let newdata = [...this.state.data]
        let flag=0
        for(let i=0;i<newupdate.length;i++){
            if(newupdate[i].name===newdata[ind].name){
                newupdate[i].quantity -= 1
                flag=1
                break
            }
        }
        if(flag===0){
            newdata[ind].quantity-=1
            
            newupdate.push(newdata[ind])
        }
        
       
        this.setState({data:newdata,update:newupdate})
    }

    updateHandler = ()=>{
        fetch(hosturl+'/categories/all/items/update',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  data:this.state.update
              })
        })
        .then(res=>res.json())
        .then(json=>{
            this.setState({showmessage:true})
        })
    }
    cartCaller=()=>{
        this.props.history.push('/cart')
    }
    render(){
        if(this.state.data.length===0){
            return(
                <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",marginTop:'30%'}}>
                <Lottie options={defaultOptions}
                height={200}
                width={200}/>
                </div>
            )
        }


        return(
            <div style={{display:'flex',flex:1}}>
            
            
            <header className={classes.FTop}>
                <div onClick={()=>this.gotoCatHandler()} style={{marginLeft:'7%'}}>
                    <IconContext.Provider value={{style:{fontSize:'25px'}}}>
                        <FaArrowLeft/>
                    </IconContext.Provider>
                </div>
                <div onClick={()=>this.cartCaller()} style={{marginLeft:'70%'}}>
                    <IconContext.Provider value={{style:{fontSize:'25px'}}}>
                        <FaShoppingBasket/>
                    </IconContext.Provider>
                </div>                
            </header>
            

            <div className={classes.Parent}>
               {this.state.showmessage && 
                <div style={{width:"100%",aspectRatio:7,backgroundColor:"green",alignItems:"center",justifyContent:"center"}}>
                    <p style={{color:"white",fontSize:15,textAlign:"center",fontWeight:"bold"}}>Updated Successfully</p>
                </div>
                }
                {
                    this.state.data.map((i,index) => {
                        // if(this.state.admin===1 || i.quantity!==0){
                            return(
                            
                            

                            <div key={index} className={classes.Child} style={{backgroundColor:(i.type)===1?'#d21502':(i.type===2)?'#ffd300':'#2a8000'}}>
                                <div className={classes.Subchild}>
                                <p style={{'fontWeight':'bold'}}>{i.name}</p>
                                <p>&#8377;{i.price}</p>
                                </div>

                                {this.state.admin===0 && i.cart_q===0 && (
                                    <div className={classes.AddtoCart} onClick={()=>this.addtoCart(i.name,i.type,i.price,index)}>
                                        Add to cart
                                    </div>
                                )}

                                {this.state.admin===0 && i.cart_q!==0 && (
                                    <div className={classes.Box}>
                                        <div className={classes.Boxchild} onClick={()=>this.removefromCart(i.name,i.type,i.price,index)}>
                                            -
                                        </div>
                                        <div className={classes.Boxchild}>
                                            {i.cart_q}
                                        </div>
                                        <div className={classes.Boxchild} onClick={()=>this.addtoCart(i.name,i.type,i.price,index)}>
                                            +
                                        </div>
                                        
                                    </div>
                                )}
                                {this.state.admin===1  && (
                                    <div className={classes.Box}>
                                        <div className={classes.Boxchild} onClick={()=>this.removefromUpdate(index)}>
                                            -
                                        </div>
                                        <div className={classes.Boxchild}>
                                            {i.quantity}
                                        </div>
                                        <div className={classes.Boxchild} onClick={()=>this.addtoUpdate(index)}>
                                            +
                                        </div>
                                        
                                    </div>
                                )}
                            </div>
                            
                        )
                        // }
                    })
                }
            </div>
           
            { this.state.admin===1 && <div className={classes.FParent}>

                <div onClick={()=>this.updateHandler()}  className={classes.GotoCart}>
                    
                    UPDATE
    
                </div>
                

            </div>}
            
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cart: state.cart,
  });
  
  
  const mapDispatchToProps = dispatch => ({
    to_cart:(payload) => dispatch(cart(payload))
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Items));