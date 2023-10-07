import {Component} from 'react'

const apiStatusConstraint = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomeRoute extends Component {
  state = {apiStatus: apiStatusConstraint.initial}

  render() {
    return (
      <div>
        <h1>zsb</h1>
      </div>
    )
  }
}
export default HomeRoute
