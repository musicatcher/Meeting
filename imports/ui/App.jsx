import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Users } from '../api/users.js';
import User from './User.jsx';

import { Details } from '../api/details.js';

import { Session } from 'meteor/session'

import Schedule from './Schedule.jsx';

import { render } from 'react-dom';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// App component - represents the whole app
export default class App extends Component {

  handleSubmit(event) {
    event.preventDefault();

    const name = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Session.set("currentName", name);

    if(Users.findOne({name: name})){

    } else {
      Users.insert({
        name,
        createdAt: new Date(), // current time
      });

      for (var day = 1; day < 8; day++) {
        // console.log('nsun, day', day);
        for (var hour = 1; hour < 25; hour++) {
          //insert hour
          Details.insert({name, day, hour, checked: false, createAt:new Date()});
          // console.log('nsun hour', hour);
        }
      }
    }

    // Clear form
    // ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderUsers() {
    return this.props.users.map((user) => (
      <User key={user._id} user={user} />
    ));
  }

  showSchedule() {
    //set empty
    render(<div />, document.getElementById('render-target'));
    //show schedule
    BlazeLayout.render('Schedule_template');
  }

  showMeeting() {

  }

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
              defaultValue={Session.get("currentName")}
            />
          </form>
          <button onClick={this.showSchedule.bind(this)}>
            Schedule
          </button>
          <button onClick={this.showMeeting.bind(this)}>
            Meeting
          </button>
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