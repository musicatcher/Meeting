import { Template } from 'meteor/templating';
import './Meeting-item.html';
import { Session } from 'meteor/session'
import { Meetings } from '../api/meetings.js';

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
	},
	'click button[name="notAccept"]'(event, instance) {
		Meetings.remove(instance.data.meeting._id);
	},
});