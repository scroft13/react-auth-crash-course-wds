import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

var passCheckDigits = document.querySelectorAll(".digitCheck666");
var passCheckLength = document.querySelectorAll(".lengthCheck666");








export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const passCheck = new RegExp(
    "^(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
  );
  const digitCheck = new RegExp("^[0-9]+$");
  
  
  

  async function handleSubmit(e) {
    e.preventDefault();
    //logic to check password
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    } else if (passCheck.test(passwordRef.current.value) !== true) {
      console.log(passCheck.exec(passwordRef.current.value));
      return setError("Password does not meet criteria");
    }
    // call signup function and passin email and password through try/catch, after clearing setError
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      //if failx
      setError("Failed to create account");
    }
    setLoading(false);
  }

  const allChecks = () => {
    digitChecker();  
    lengthChecker();
    //inputFunc();
      
    
  }
  // const passwordInput = document.querySelector("#tester")

  // const inputFunc = () => {
  //   console.log(passwordInput)
  //   console.log("Test")
  
  //}
  const digitChecker = () => {
    if (!passwordRef.current.value) {
      console.log("Digit Black")
      passCheckDigits.style = "color: black";
    } else if (digitCheck.test(passwordRef.current.value) !== true) {
      console.log("Digit Red")
      passCheckDigits.style = "color: red";
    } else if (digitCheck.test(passwordRef.current.value) === true){
      console.log("Digit Green")
     passCheckDigits.style = "color: green";
    }
    
  }

  const lengthChecker = () => {
    if (passwordRef.current.value.length === 0) {
      passCheckLength.style = "color: black";
   } else if (
     passwordRef.current.value.length > 0 &&
     passwordRef.current.value.length <= 7
   ) {
     passCheckLength.style = "color: red";
   } else if (passwordRef.current.value.length >= 8)
     passCheckLength.style = "color: green";

  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>

          {/* if there is an error display it */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            
            <Form.Group id="password" onInput={allChecks}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                id="tester"
                
                required
              />
            </Form.Group>
            
            <div className="passCheckList">
              Your password must contain:
              <ul className="passChecklist">
                <li className="lengthCheck666">At least 8 Characters</li>
                <li className="digitCheck666">At least one Number</li>
                <li className="charCheck">
                  At least one capitalized and lower case character
                </li>
              </ul>
            </div>
            
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            
            <Button
              disable={loading ? "disable" : undefined}
              className="w-100"
              type="submit"
            >
              Sign Up
            </Button>
          
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="login">Log In?</Link>
      </div>
    </>
  );
}
