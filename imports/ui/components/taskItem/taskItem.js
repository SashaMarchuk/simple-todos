import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Votes } from '../../../api/votes/votes';

import './taskItem.html';

Template.taskItem.onCreated(function () {
  TemplateVar.set('voteStatus', false);
});
Template.taskItem.helpers({
  isOwner(ownerId) {
    return ownerId && ownerId === Meteor.userId();
  },
  voteByTask(taskId, type) {
    return Votes.findOne({ taskId })?.type === type && 'active';
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
      err && console.error('Error on set private task');
      e.target.disabled = false;
    });
  },
  'click .vote'(e, tmpl) {
    const userId = Meteor.userId();
    if (userId) {
      const { type } = e.target.dataset;
      const { _id } = this.taskData;
      TemplateVar.set('voteStatus', true);
      const options = { type, taskId: _id, createdAt: new Date(), userId };
      Meteor.call('setVote', options, (err, res) => {
        err && console.error('Error on set vote', err);
        TemplateVar.set(tmpl, 'voteStatus', false);
      });
    }
  }
});
