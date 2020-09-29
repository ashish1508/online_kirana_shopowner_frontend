import React,{Component} from 'react';

import classes from './NavigationItem.css';
import {BrowserRouter,Route, Switch,Redirect,withRouter} from 'react-router-dom'
import Cart from '../../../Cart';
import Categories from '../../../Categories';

// import {useHistory} from 'react-router-dom'

// const history=useHistory()

class NavigationItem extends Component{

    clickHandler=(lin)=>{
        this.props.history.push(lin)
        this.props.click()
    }
    render(){
        return(
            <li className={classes.NavigationItem} onClick={()=>this.clickHandler(this.props.link)}>
                <div className={this.props.active ? classes.active : null}>
                    {this.props.children}
                </div>
            </li>
        )
    }
}


// const navigationItem = ( props ) => (
//     <li className={classes.NavigationItem}>    
//         <a 
//             href={props.link} 
//             className={props.active ? classes.active : null}>{props.children}</a>
//     </li>

// );

export default withRouter(NavigationItem);