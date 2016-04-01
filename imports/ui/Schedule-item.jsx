import { Template } from 'meteor/templating';
import './Schedule-item.html';
import { Users } from '../api/users.js';
import { Meetings } from '../api/meetings.js';

Template.Schedule_item.events({
	'click button[name="book"]'(event, instance) {
		//Add all user in
		var users = Users.find().fetch();
		var userNames = new Array();
		
		for(var i = 0; i < users.length; i++) {
			userNames[i] = users[i].name;
		}
		Meetings.insert({day: instance.data.schedule.day, hour: instance.data.schedule.hour, participant:userNames, acceptedUsers:[], text:'day:'+instance.data.schedule.day+', hour:'+instance.data.schedule.hour+':00'});
	},
});