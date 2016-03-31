import React, { Component, PropTypes } from 'react';

import { createContainer } from 'meteor/react-meteor-data';

import { render } from 'react-dom';

import App from './App.jsx';

import { Details } from '../api/details.js';
import Detail from './Detail.jsx';

import { Session } from 'meteor/session'

export default class UserDetail extends Component {
	back() {
	    render(<App />, document.getElementById('render-target'));
	}

	renderDetails() {
	    return this.props.details.map((detail) => (
	      	<Detail key={detail._id} detail={detail} />
	    ));
	}

  	render() {
	    return (
	      <div className="container">
	        <header>
		        <button className="back" onClick={this.back.bind(this)}>
		          back
		        </button>
	        	<h1>User Detail</h1>
	        	
	        </header>
	        <ul>
	          	{this.renderDetails()}
	        </ul>
	      </div>
    );
  }
}

Details.propTypes = {
	user: PropTypes.array.isRequired,
  	details: PropTypes.array.isRequired,
};

export default createContainer((obj) => {
	//selected user
	var name = obj.user.name;
	return {
		details: Details.find({name}, { sort: { day: 1, hour: 1} }).fetch(),
	};
}, UserDetail);