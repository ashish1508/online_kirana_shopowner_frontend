import { combineReducers } from 'redux';
import store from './store';

const cartReducer = (state=[],action)=>{
    switch(action.type){
        case 'CART':
            return [...action.payload]
        default:
            return state
    }
}
// const orderReducer = (state={id:-1},action)=>{
//     switch(action.type){
//         case 'ORDERID':
//             return {id:action.id}
//         default:
//             return state
//     }
// }

// const state={
//     token:""
// }

const orderItemsReducer = (state={ current_order:{},all_orders:[]},action) => {
    switch(action.type){
        case 'GET_ORDERS':
            return {...state, all_orders:action.payload}
        case 'ADD_TO_ORDERS':
            let new_all_orders = state.all_orders
            new_all_orders.push(action.payload)
            return {...state , all_orders:new_all_orders}
        case 'MAKE_CURRENT':
            return {...state, current_order:action.payload}
        default:
            return state
    }

}

const tokenReducer=(state={token:null},action)=>{
    if(action.type==='STORE_TOKEN'){
        return{
            token:action.val
        }
    }
    if(action.type==='REMOVE_TOKEN'){
        return {
            token:null
        }
    }
    return state
}
export default combineReducers({
    
    cart:cartReducer,
    order:orderItemsReducer,
    token:tokenReducer
});