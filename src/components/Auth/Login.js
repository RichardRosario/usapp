import React from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

class Login extends React.Component {
  // set initial state
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false,
  };

  handleChange = (event) => {
    // set the new state after change
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleSubmit = (event) => {
    // prevent reload page after submit event
    event.preventDefault();
    // validate form inputs
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((signedInUser) => {
          console.log(signedInUser);
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          });
        });
    }
  };

  isFormValid = ({ email, password }) => email && password;

  // handle the user input errors
  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  render() {
    // destructure the variables of the state
    const { email, password, errors } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="blue" textAlign="center">
            <Icon name="discussions" color="orange" />
            Login to UsApp!
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email address"
                onChange={this.handleChange}
                className={this.handleInputError(errors, "email")}
                value={email}
                type="text"
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                className={this.handleInputError(errors, "password")}
                value={password}
                type="text"
              />
              <Button color="violet" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Not yet a UsApp user? <Link to="/register"> Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
