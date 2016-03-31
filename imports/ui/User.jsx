import React, { Component, PropTypes } from 'react';
 
import { Users } from '../api/users.js';

import UserDetail from './UserDetail.jsx';

import { render } from 'react-dom';

export default class User extends Component {
 
  deleteThisUser() {
    Users.remove(this.props.user._id);
  }

  showUserDetail() {
    render(<UserDetail user={this.props.user}/>, document.getElementById('render-target'));
  }

  render() {
    const userClassName = this.props.user.checked ? 'checked' : '';
    return (
      <li className={userClassName}>
        <button className="userDetail" onClick={this.showUserDetail.bind(this)}>
          Detail
        </button>

        <button className="delete" onClick={this.deleteThisUser.bind(this)}>
          &times;
        </button>
 
        <span className="text">{this.props.user.name}</span>
      </li>
    );
  }
}
 
Users.propTypes = {
  user: PropTypes.object.isRequired,
};