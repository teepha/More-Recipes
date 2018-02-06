import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import GuestNavBar from './navBar/GuestNavBar.jsx';
import UserNavBar from './navBar/UserNavBar.jsx';
import logOutRequest from '../actions/actionCreators/logOutActions';
import verifyToken from '../utils/verifyToken';


/**
 * @description HOC for Navigation Bar component
 *
 * @class NavBar
 *
 * @extends Component
 */
class NavBar extends Component {
  // /**
  //  * @description creates an instance of Nav Bar
  //  * 
  //  * @constructor
  //  *
  //  * @param { props } props - contains navbar component properties
  //  *
  //  */
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     username: ''
  //   };
  // }
  /**
   * @description handles decoding of token for current logged in user
   * 
   * @method componentDidMount
   *
   * @returns { * } null
   */
  componentDidMount() {
    const userDecodedInfo = jwt.decode(localStorage.getItem('jwtToken'));
    if (localStorage.getItem('jwtToken') && userDecodedInfo !== null) {
      this.setState({ username: userDecodedInfo.username });
    } else {
      this.setState({ username: '' });
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log()
  // }
  /**
   * @description handles on logout event
   *
   * @return {*} null
   */
  handleLogOut() {
    logOutRequest();
    this.context.router.history.push('/');
  }
  /**
   * @description renders Navigation bar
   *
   * @returns { jsx } jsx - renders NavBar component
  */
  render() {
    // const { username } = this.state,
    const { isAuthenticated, user } = this.props.authenticatedUser;
    return (
      <div className="container pl-0 pr-0">
        <header className="mb-5">
          <nav className="navbar navbar-toggleable-md navbar-light fixed-top">
            <button className="navbar-toggler navbar-toggler-right"
              type="button" data-toggle="collapse" data-target="#navbarItems"
              aria-controls="navbarItems" aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand" to="/">
              <img src='/images/logo.png' width="45" height="32"
              className="d-inline-block align-center" alt="More Recipe Logo"/>
              <span id="site-name">More Recipes</span>
            </Link>
            { (isAuthenticated && verifyToken()) ?
              <UserNavBar
                currentUsername={user.username}
                logOut={this.handleLogOut.bind(this)}/> :
              <GuestNavBar/>
            }
          </nav>
        </header>
      </div>
    );
  }
}

NavBar.propTypes = {
  authenticatedUser: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape().isRequired
  }).isRequired
};

NavBar.contextTypes = {
  router: PropTypes.shape().isRequired
};
/**
 * @description maps redux state to props
 *
 * @param { object } state - holds nav bar state
 *
 * @return { object } props - returns mapped props from state
 */
const mapStateToProps = state => ({
  authenticatedUser: state.authenticatedUser
});

export default connect(mapStateToProps)(NavBar);
