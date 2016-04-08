import { Template } from 'meteor/templating';
import './Meeting-item.html';
import { Session } from 'meteor/session'
import { Meetings } from '../api/meetings.js';
import { Details } from '../api/details.js';

Template.Meeting_item.onCreated(function meetingItemOnCreated() {

});

Template.Meeting_item.helpers({
	status(meeting){
		var result = 'tentative';
		if (meeting.acceptedUsers.length == meeting.participant.length) {
			result = 'booked';
		}
		return result;
	},
	itemStatus(meeting){
		var result = 'meeting-item-tentative';
		if (meeting.acceptedUsers.length == meeting.participant.length) {
			result = 'meeting-item-booked';
		}
		console.log("itemStatus", result);
		return result;
	},
	accepted(meeting){
		var result = false;
		for (var i = meeting.acceptedUsers.length - 1; i >= 0; i--) {
			if (meeting.acceptedUsers[i] == Session.get('currentName')){
				result = true;
			}
		}
		return result;
  	},
});

Template.Meeting_item.events({
	'click button[name="cancel"]'(event, instance) {
		var meetingData = instance.data.meeting;
		for (var i =  0; i < meetingData.acceptedUsers.length; i++) {
			if (meetingData.acceptedUsers[i] == Session.get('currentName')){
				meetingData.acceptedUsers.splice(i, 1);
			}
		}
		Meetings.update(instance.data.meeting._id, meetingData);
	},
	'click button[name="accept"]'(event, instance) {
		var meetingData = instance.data.meeting;
		meetingData.acceptedUsers.splice(meetingData.acceptedUsers.length - 1, 0, Session.get('currentName'));
		Meetings.update(instance.data.meeting._id, meetingData);

		var name = Session.get('currentName');
		var result = Details.findOne({name, day:meetingData.day, hour:meetingData.hour});
		result.checked = true;
		Details.update(result._id, result);
		// console.log(result);
	},
	'click button[name="notAccept"]'(event, instance) {
		Meetings.remove(instance.data.meeting._id);
	},
});