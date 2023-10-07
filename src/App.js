import './App.css'

import {Switch} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'

const App = () => (
  <Switch>
    <ProtectedRoute path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
  </Switch>
)

export default App

//
