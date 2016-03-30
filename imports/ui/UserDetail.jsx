import React, { Component, PropTypes } from 'react';

import { render } from 'react-dom';
import App from './App.jsx';

export default class UserDetail extends Component {
	back() {
	    render(<App />, document.getElementById('render-target'));
	}
	
  	render() {
	    return (
	      <div className="container">
	        <header>
		        <button className="back" onClick={this.back.bind(this)}>
		          back
		        </button>
	        	<h1>User Detail</h1>
	        	<h4>Monday</h4>
	        	<ul type="disc">
	        		<li>1:00</li>
				 	<li>2:00</li>
				 	<li>3:00</li>
				 	<li>4:00</li>
				</ul>
				<h4>Tuesday</h4>
	          	<ul type="disc">
					<li>1:00</li>
				 	<li>2:00</li>
				 	<li>3:00</li>
				 	<li>4:00</li>
				</ul>
	        </header>
	        
	      </div>
    );
  }
}