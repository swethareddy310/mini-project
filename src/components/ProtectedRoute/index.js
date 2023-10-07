import Cookies from 'js-cookie'
import {Route} from 'react-router-dom'
import LoginRoute from '../LoginRoute'

const ProtectedRoute = props => {
  const JwtToken = Cookies.get('jwt_token')

  console.log(JwtToken)
  if (JwtToken === undefined) {
    return <LoginRoute />
  }
  return <Route {...props} />
}

export default ProtectedRoute
