import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import classes from './Categories.css'

import Lottie from 'react-lottie';
import * as animationData from '../anime/loading.json'
import {hosturl} from '../config.js'
import { FaShoppingBasket } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import {connect} from 'react-redux'
const mapping={
    "1":"Burgers",
    "2":"Cheese Wheel",
    "3":"Cool Drinks",
    "4":"Fried Rice",
    "5":"Grilled Sandwich",
    "6":"Manchuria",
    "7":"Noodles",
    "8":"Pastries",
    "9":"Pizza",
    "10":"Puffs",
    "11":"Rolls",
    "12":"Snacks"
}
class Categories extends Component{
    state={
        categories:[],
        cart:[],
        data:[]
    }
    componentDidMount(){
        console.log("-lolll------------------------",this.props.tok.token)
        fetch(hosturl+'/categories/all/')
        .then(response=>{
          return response.json()
        })
        .then(json=>{
          this.setState({categories:json.categories})
        })
        .catch(err =>{
          console.log(err)
        })
    }

    callHandler=(index)=>{
        if(window.location.pathname==='/admin'){
            this.props.history.push('/admin/'+(index+1))
        }
        else{
        this.props.history.push('/'+(index+1))
        }
    }

    cartCaller=()=>{
        this.props.history.push('/cart')
    }

    logoutHandler=()=>{
        this.props.removeToken()
           

    }
    render(){
        const defaultOptions = {
            loop: true,
            autoplay: true, 
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };
        if(this.state.categories.length===0){
            return(
                <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center",marginTop:'30%'}}>
                <Lottie options={defaultOptions}
                height={200}
                width={200}/>
                </div>
            )
        }
        return(
            <div>
            <header className={classes.Header} style={{height:'50px'}}>
                <h1 style={{textAlign:'centre'}}>Categories</h1>
                <div onClick={()=>this.cartCaller()} style={{position:'absolute', right:50, top:27}}>
                    <IconContext.Provider value={{style:{fontSize:'25px'}}}>
                        <FaShoppingBasket/>
                    </IconContext.Provider>
                </div>
            </header>
            <div className={classes.Categories}>
                {
                    this.state.categories.map((i,index) => {
                    return (
                        <div 
                            className={classes.Ca} 
                            key={index} 
                            onClick={()=>this.callHandler(index)}>

                               <div style={{marginTop:'30px'}}>
                                   {/* <img src={require(`../images/image${index+1}.png`)} alt="loading.." height={100} width={100}/> */}
                                   <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center"}}>
                                        <Lottie options={   {loop: true,
                                            autoplay: true, 
                                            animationData: require(`../anime/anime${index+1}.json`),
                                            rendererSettings: {
                                              preserveAspectRatio: 'xMidYMid slice'
                                            }}}
                                        height={100}
                                        width={100}/>
                                    </div>
                                   <p style={{fontWeight:'bold'}}>{mapping[index+1]}</p>
                               </div>

                        </div>
                    )
                    })
                }
            </div>
             <button onClick={()=>this.logoutHandler()}>Logout</button>
          
            </div>

        )
        
    }
            
}

const mapDispatchToProps=dispatch=>{
    return{
        removeToken:()=>dispatch({type:'REMOVE_TOKEN'})
    }
}
const mapStateToProps=state=>{
    return{
        tok:state.token
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Categories))
