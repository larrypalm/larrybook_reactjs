import React, { Component } from 'react';
import '../styles/home.css';
import {Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Button,
  Row,
  Grid  } from 'react-bootstrap';

class Home extends Component {

 render() {
  return(
    <div className="home">
     <h2>Välkommen till Larrybook</h2>
     <p>LarryBook är en plattform för dig som vill diskutera olika filmer varje dag.</p>
     <p>Logga in eller registera dig nedan som ny användare för att fortsätta.</p>

    <div className="content">
      <form onSubmit={this.props.register}>
      <Form>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
    				<FormControl
              type="text"
              name="email"
              placeholder="Email"
              onChange={this.props.userHandler}
              value={this.props.email}
            />
    			</Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl
              type="password"
              name="password"
              placeholder="Password"
              value={this.props.password}
              onChange={this.props.passwordHandler}
            />
          </Col>
        </FormGroup>
        <FormGroup>
    			<Col smOffset={2} sm={10}>
    				<Button type="submit" onClick={this.props.signIn}>Logga in</Button>
            <Button type="submit" onClick={this.props.signIn}>Registrera</Button>
          </Col>
    		</FormGroup>
        <FormGroup>

        </FormGroup>
      </Form>
      </form>

      </div>
    </div>
  )
 }
}

export default Home
