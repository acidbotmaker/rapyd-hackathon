import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login } from "../actions/userActions";
import LoginForm from "../components/TemplateContainer";

const LoginScreen = ({ location , history}) => {

  const  [email, setEmail]  = useState('');
  const [ password, setPassword] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  
  const dispatch = useDispatch();

  useEffect(() => {
      if(userInfo) {
          history.push(redirect)
      }
  },[userInfo, history, redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email,password))
  };

  return (
    <LoginForm>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>  }
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New User ?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </LoginForm>
  );
};

export default LoginScreen;
