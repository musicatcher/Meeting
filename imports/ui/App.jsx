import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Users } from '../api/users.js';
import User from './User.jsx';
 
// App component - represents the whole app
export default class App extends Component {

  handleSubmit(event) {
    event.preventDefault();

    const name = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    if(Users.findOne({name: name})){

    } else {
      Users.insert({
        name,
        createdAt: new Date(), // current time
      });
    }

    // Clear form
    // ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderUsers() {
    return this.props.users.map((user) => (
      <User key={user._id} user={user} />
    ));
  }

  // configureScene(route){
  //   return Navigator.SceneConfigs.FloatFromRight;
  // },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Meeting</h1>
          <form className="new-user" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Enter your name"
            />
          </form>
        </header>
 
        <ul>
          {this.renderUsers()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  users: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    users: Users.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);