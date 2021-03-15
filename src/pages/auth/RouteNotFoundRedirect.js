import React from 'react'
import { Redirect } from 'react-router-dom'
class RouteNotFoundRedirect extends React.Component {
  state = {
    redirect: false
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return 
    }
  }
  render () {
    return (
       <div>
           <Redirect to='/account/login' />
        {/* {this.renderRedirect()}
        <button onClick={this.setRedirect}>Redirect</button> */}
       </div>
    )
  }
}
export default RouteNotFoundRedirect;