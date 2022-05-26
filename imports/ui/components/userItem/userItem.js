import { Template } from 'meteor/templating';
import { TemplateVar } from 'meteor/frozeman:template-var';

import './userItem.html';

Template.userItem.onCreated(function () {});
Template.userItem.onRendered(function () {
  /* ... */
});
Template.userItem.onDestroyed(function () {
  /* ... */
});
Template.userItem.helpers({
  /* ... */
});
Template.userItem.events({
  'change .userItem__status'(e, tmpl) {
    const { checked } = e.target;
    const { _id } = this.userData;
    e.target.disabled = true;
    Meteor.call('users.setCheckedBan', _id, checked, (err, res) => {
      if (err) {
        alert(err.reason || err.method || err.error);
        e.target.checked = !checked;
      }
      e.target.disabled = false;
    });
  }
});
