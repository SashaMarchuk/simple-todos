import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './adminPage.html';

import '../../components/userItem/userItem';

Template.adminPage.onCreated(function () {});
Template.adminPage.onRendered(function () {
  /* ... */
});
Template.adminPage.onDestroyed(function () {
  /* ... */
});
Template.adminPage.helpers({
  users() {
    return Meteor.users.find({}, { sort: { createdAt: -1 } });
  },
});
Template.adminPage.events({});
