import React from "react"
import { Link } from "react-router-dom"

import "./login.css"

class Login extends React.Component {

  state = {
    email: "",
    password:"",
  }

  // executed when writing the email
  handleOnChangeEmail = (event) => {
    this.setState ({
      email: event.target.value
    })
  }

  // executed when writing the passwrd
  handleOnChangePassword = (event) => {
    this.setState ({
      password: event.target.value
    })
  }

  // executed when the login button is pressed
  handleOnSubmit = (event) => {
    console.log("pressed");
    event.preventDefault()
    this.props.login(this.state.email, this.state.password)
    this.setState({
      email: "",
      password: ""
    })
  }

  render() {
    return ( // this is the login field and login button
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={this.handleOnSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Enter your email"
            value={this.state.email}
            onChange={this.handleOnChangeEmail}/>
          <input
            className="input"
            type="password"
            placeholder="Enter your password"
            value={this.state.password}
            onChange={this.handleOnChangePassword}/>
          <button >Login</button>
        </form>
      </div>
    )
  }

}

export default Login
