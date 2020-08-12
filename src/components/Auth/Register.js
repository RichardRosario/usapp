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
import md5 from "md5";

class Register extends React.Component {
  // set initial state
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref("users"),
  };

  handleChange = (event) => {
    // set the new state after change
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  isFormValid = () => {
    // initialize error variable
    let errors = [];
    let error;

    // check is form fields are empty
    if (this.isFormEmpty(this.state)) {
      // throw error
      error = { message: "Fill in the fields" };
      // add the error property to state and set the new state
      this.setState({ errors: errors.concat(error) });
      // stop execution
      return false;
      // check if password is valid
    } else if (!this.isPasswordValid(this.state)) {
      // throw error
      error = { message: "Please provide a valid password" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      // form is valid
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    // check password minimum length
    if (password < 6 || passwordConfirmation < 6) {
      // if true stop execution
      return false;
      // check is password === to passwordConfirm
    } else if (password !== passwordConfirmation) {
      // if true, stop execution
      return false;
    } else {
      // password is valid
      return true;
    }
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleSubmit = (event) => {
    // prevent reload page after submit event
    event.preventDefault();
    // validate form inputs
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      // authenticate with firebase
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          console.log(createdUser);
          // get user profile
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log("User saved");
              });
            })
            .catch((err) => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false,
              });
            });
        })
        // catch the error
        .catch((err) => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          });
        });
    }
  };

  saveUser = (createdUser) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };
  // handle the input errors
  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  render() {
    // destructure the variables of the state
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
    } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="discussions" color="orange" />
            Register with UsApp!
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                value={username}
                className={this.handleInputError(errors, "username")}
                type="text"
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email address"
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errors, "email")}
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
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Confirm password"
                onChange={this.handleChange}
                value={passwordConfirmation}
                className={this.handleInputError(
                  errors,
                  "passwordConfirmation"
                )}
                type="text"
              />
              <Button color="orange" fluid size="large">
                Submit
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
            Already an usapp user? <Link to="/login"> Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
