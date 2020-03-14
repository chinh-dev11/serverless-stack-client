import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from 'aws-amplify';
import LoaderButton from '../components/LoaderButton';
import { useFormFields } from '../libs/hooksLib';
import "./Login.css";

export default function Login(props) {
    /**
     * - The useState hook just gives you the current value of the variable you want to store in the state and a function to set the new value.
     * - The setEmail and setPassword functions to store what the user types in — e.target.value. Once we set the new state, our component gets re-rendered. 
     * - In React, this pattern of displaying the current form value as a state variable and setting the new one when a user types something, is called a Controlled Component.
     */
    const [isLoading, setIsLoading] = useState(false); // to give feedback (e.g. loading anim)
    
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [fields, handleFieldChange] = useFormFields({
        email: '',
        password: ''
    });



    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event){
        event.preventDefault();

        setIsLoading(true); // show loading anim

        try{
            await Auth.signIn(fields.email, fields.password);
            console.log('logged in!');
            props.userHasAuthenticated(true); // update state
            props.history.push('/'); // using the router props history
        }catch(e){
            console.log(e.message);
            setIsLoading(false);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={fields.email}
                        // onChange={e => setEmail(e.target.value)}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={fields.password}
                        // onChange={e => setPassword(e.target.value)}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                {/** link up our submit button with our state by using a validate function */}
                {/* <Button type="submit" block bsSize="large" disabled={!validateForm()}>Login</Button> */}
                <LoaderButton 
                    type="submit"
                    block
                    bsSize="large"
                    disabled={!validateForm()}
                    isLoading={isLoading}
                    >
                    Login
                </LoaderButton>
            </form>      
        </div>
    );
}