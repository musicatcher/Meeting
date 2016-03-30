import React, { Component, PropTypes } from 'react';
 
import { Users } from '../api/users.js';

import UserDetail from './UserDetail.jsx';

import { render } from 'react-dom';

export default class User extends Component {
  toggleChecked() {
    Users.update(this.props.user._id, {
      $set: { checked: !this.props.user.checked },
    });
  }
 
  deleteThisUser() {
    Users.remove(this.props.user._id);
  }

  showUserDetail() {
    render(<UserDetail />, document.getElementById('render-target'));
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
 
        <input
          type="checkbox"
          readOnly
          checked={this.props.user.checked}
          onClick={this.toggleChecked.bind(this)}
        />
 
        <span className="text">{this.props.user.name}</span>
      </li>
    );
  }
}
 
Users.propTypes = {
  user: PropTypes.object.isRequired,
};