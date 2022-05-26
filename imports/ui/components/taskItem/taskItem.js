import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './taskItem.html';

Template.taskItem.onCreated(function () {
});
Template.taskItem.helpers({
  isOwner(ownerId) {
    return ownerId && ownerId === Meteor.userId();
  }
});

Template.taskItem.events({
  'change .toggle-checked'(e, tmpl) {
    const { checked } = e.target;
    const { _id } = this.taskData;
    e.target.disabled = true;
    Meteor.call('tasks.setChecked', _id, checked, (err, res) => {
      err && alert('Can not set checked for this task');
      e.target.disabled = false;
    });
  },
  'click .delete'() {
    const { _id } = this.taskData;
    Meteor.call('tasks.remove', _id);
  },
  'click .toggle-private'(e, tmpl) {
    const { _id } = this.taskData;
    const taskPrivateStatus = this.taskData.private;
    e.target.disabled = true;
    Meteor.call('tasks.setPrivate', _id, !taskPrivateStatus, (err, res) => {
      err && console.error('Error on set private task')
      e.target.disabled = false;
    });
  }
});
