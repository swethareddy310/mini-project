import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import {Redirect} from 'react-router-dom'

class LoginRoute extends Component {
  state = {userNameInput: '', passwordInput: '', isLogin: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({userNameInput: event.target.value})
  }

  onChangeUserPassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    console.log(history)
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isLogin: true, errorMsg})
  }

  onSubmitLoginForm = async event => {
    const {userNameInput, passwordInput} = this.state
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'

    const userDetails = {
      username: userNameInput,
      password: passwordInput,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserNameDetails = () => {
    const {userNameInput} = this.state
    return (
      <div className="user-details">
        <label htmlFor="userNameInput" className="user-label">
          USERNAME
        </label>
        <input
          type="text"
          id="userNameInput"
          value={userNameInput}
          className="user-input"
          onChange={this.onChangeUserName}
        />
      </div>
    )
  }

  renderUserPasswordDetails = () => {
    const {passwordInput} = this.state
    return (
      <div className="user-details">
        <label htmlFor="passwordInput" className="user-label">
          PASSWORD
        </label>
        <input
          type="password"
          id="passwordInput"
          value={passwordInput}
          className="user-input"
          onChange={this.onChangeUserPassword}
        />
      </div>
    )
  }

  render() {
    const {isLogin, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-route-container">
        <img
          src="https://res.cloudinary.com/djslwoegx/image/upload/v1696520789/Group_7399_movies-logo_jylkqb.png"
          alt="login website logo"
          className="website-logo"
        />
        <form className="Login-details-card" onSubmit={this.onSubmitLoginForm}>
          <h1 className="login-heading">Login</h1>
          {this.renderUserNameDetails()}
          {this.renderUserPasswordDetails()}
          {isLogin && <p className="error-msg"> {errorMsg} </p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}
export default LoginRoute
