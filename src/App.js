import React, { Component } from 'react';
import {BrowserRouter,Route, Switch,Redirect} from 'react-router-dom'
import './App.css';
import Categories from './components/Categories'
import Items from './components/Items';
import Order from './components/Order';
import Login from './components/Login';
import Signup from './components/Signup';
import NewOrders from './components/NewOrders';
import ViewOrder from './components/ViewOrder';
import { Provider } from 'react-redux';
import {store} from './redux/store';

import Cart from './components/Cart';
import { messaging } from "./firebase";
import {connect} from 'react-redux'
import Layout from './components/Layout'
class App extends Component {
  state={
    categories:[],
    cart:[],
    data:[]
  }
  async componentDidMount() {


    // if ("geolocation" in navigator) {
    //   console.log("Available");
    // } else {
    //   console.log("Not Available");
    // }
    // navigator.geolocation.getCurrentPosition(function(position) {
    //   console.log("Latitude is :", position.coords.latitude);
    //   console.log("Longitude is :", position.coords.longitude);
    // });
    messaging.requestPermission()
      .then(async function() {
        const token = await messaging.getToken();
        console.log("------")
        console.log(token)
      })
      .catch(function(err) {
        console.log("Unable to get permission to notify.", err);
      });
    navigator.serviceWorker.addEventListener("message", (message) =>{
       console.log("ooo",message.data.firebaseMessaging.payload.data.message)
        const notificationTitle = "New Order";
        const notificationOptions = {
            body: "Click here to view order details",
            icon: require("./anime/favicon.ico"), 
            // sound:require("./res/raw/done-for-you.mp3")       
        };

        if (!("Notification" in window)) {
            console.log("This browser does not support system notifications.");
        } else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            var notification = new Notification(notificationTitle,notificationOptions);
            notification.onclick = function(event) {
                event.preventDefault();
                window.open("http://localhost:3000/" , '_blank');
                notification.close();
            }
        }
    });
  }
 
  render() {
    
    let routes=(
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
       
        <Redirect to='/'/>
      </Switch>
    )

    if(this.props.token.token!==null){
      routes = (
        <Layout>
        <Switch>             
        <Route exact path='/cart' component={Cart}/>
       
        <Route exact path='/neworders' component={NewOrders}/>
        
        <Route exact path='/vieworder' component={ ViewOrder}/>
        <Route exact path='/' component={NewOrders}/>
        <Route exact path='/cat' component={Categories}/>
        <Route exact path='/admin' component={Categories}/>
        <Route exact path='/:id' component={Items}/>
        <Route exact path='/admin/:id' component={Items}/>
        
        </Switch>
        </Layout>
      )
    }
    console.log("hey",this.props.token.token)
    return (  
        
      <BrowserRouter>
        <div className="App">          
             {/* <Categories categories={this.state.categories}/>  */}
             
                {routes}
            
        </div>
      </BrowserRouter>
     
   
    );
  }
}
const mapStateToProps = state => ({
  token: state.token,
  
});

export default connect(mapStateToProps)(App);
