import React, { Component } from 'react';

import Button from '../components/UI/Button/Button';
import Spinner from './UI/Spinner/Spinner';
import classes from './Signup.css';
//import axios from '../../../axios-orders';
import Input from './UI/Input/Input';
import { messaging } from "../firebase";
import {connect} from 'react-redux'

class Signup extends Component {
    state = {
        orderForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:6
                },
                valid: false,
                touched: false
            },
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Name'
                },
                value: '',
                validation: {
                    required: true,
                  
                },
                valid: false,
                touched: false
            },
            imageurl: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Image url'
                },
                value: '',
                validation: {
                    required: true,
                   
                },
                valid: false,
                touched: false
            },
           
            
        },
        formIsValid: false,
        loading: false
    }

    // orderHandler = ( event ) => {
    //     event.preventDefault();
    //     this.setState( { loading: true } );
    //     const formData = {};
    //     for (let formElementIdentifier in this.state.orderForm) {
    //         formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    //     }
    //     const order = {
    //         ingredients: this.props.ingredients,
    //         price: this.props.price,
    //         orderData: formData
    //     }
    //     axios.post( '/orders.json', order )
    //         .then( response => {
    //             this.setState( { loading: false } );
    //             this.props.history.push( '/' );
    //         } )
    //         .catch( error => {
    //             this.setState( { loading: false } );
    //         } );
    // }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    submitHandler=()=>{
        this.setState( { loading: true } );
        console.log(this.state.orderForm.email.value)
        console.log(this.state.orderForm.password.value)
        console.log(this.state.orderForm.name.value)
        console.log(this.state.orderForm.imageurl.value)
        messaging
        .getToken()
        .then(token => {
        console.log("fb_token",token)
        fetch('https://floating-inlet-91907.herokuapp.com/api/users/signup', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        
            },
            body: JSON.stringify({
            name:"zak",
            email: "zak@gmail.com",
            password: "1234567890",
            phone:"8328206209",
            type:"shop",
            shopname:"sri venkateshwara",
            shopurl:"url"
            
            }),
        }).then((response)=>(response.json()))
            .then((json)=> {
                //this.props.navigation.navigate("Categories")
                console.log(json)
                console.log("signup : ")
       
                // this.props.navigation.navigate('Stores');
                this.props.history.push('/categories')

            })
            .catch((error) => {
                //this.props.navigation.navigate("Categories")
                console.error(error);
            });
        });
        
    }
    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={()=>this.submitHandler()}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Signup Data</h4>
                {form}
            </div>
        );
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        storeToken:(data)=>dispatch({type:'STORE_TOKEN',val:data})
    }
}

export default connect(null,mapDispatchToProps)(Signup);