import { Template } from 'meteor/templating';

import './Schedule.html';
import './Schedule-item.jsx';

import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

Template.Schedule_template.helpers({
  scheduleArgs(schedule) {
    return {
      schedule,
    };
  },
  schedules(){
  	var days = new Array();
  	var idx = 0;
  	for (var day = 1; day < 8; day++) {
  		for (var hour = 1; hour < 25; hour++) {
  			days[idx++] = {day:day, hour:hour, text:'day'+day+', hour'+hour+':00'};
  		}
  	}
  	return days;
  }
});

Template.Schedule_template.events({
	'click button[name="back"]'(event, instance) {
		//remove self
		BlazeLayout.render('');
		//show main App
		render(<App />, document.getElementById('render-target'));
	},
});
