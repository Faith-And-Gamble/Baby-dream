/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

function LoginPage({ login, isLoggedIn }) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    password: '',
    username: '',
  });
  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const url = 'http://localhost:8080/api/auth/signin';
    login(url, state);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  return (
    <Row>
      <Col
        md={6}
        className="p-5 m-auto shadow-sm rounded-lg"
      >
        <img src="assets/images/login-image.png" alt="login-img" />
      </Col>
      <Col
        md={6}
        className="p-5 m-auto shadow-sm rounded-lg"
      >
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              onChange={(e) => handleChange(e)}
              value={state.username}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
              value={state.password}
            />
          </Form.Group>
          {
           isLoggedIn
             ? (
               <Button variant="success btn-block" type="submit" onClick={handleSubmit}>
                 Login
               </Button>
             )
             : (
               <Button variant="success btn-block" type="submit" onClick={handleSubmit}>
                 Logout
               </Button>
             )
         }
          <br />
          <br />
          <Form.Group controlId="formBasicPassword">
            <Form.Label>New user?</Form.Label>
            <br />
            <Link to="/signup" className="">Sign Up</Link>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
}

const mapDispatchToProps = {
  login,
};
const mapStateToProps = (state) => ({
  isLoggedIn: state.loader.isLoggedIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
