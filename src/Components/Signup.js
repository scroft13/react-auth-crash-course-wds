import React, {useRef, useState} from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from '../Contexts/AuthContext'


export default function Signup() {
  
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
  
    async function handleSubmit(e){
        e.preventDefault();
        //logic to check password
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match")
        }
        // call signup function and passin email and password through try/catch, after clearing setError
        try{
            setError('')
            setLoading(true)
            signup(emailRef.current.value, passwordRef.current.value)
        }//if failx
        catch{
           setError('Failed to create account') 
        }
        setLoading(false)
        
    }

    return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {currentUser && JSON.stringify(currentUser.email)}
          {/* if there is an error display it */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disable={loading ? "disable": undefined} className="w-100" type="submit">Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? Log In?
      </div>
    </>
  );
}
