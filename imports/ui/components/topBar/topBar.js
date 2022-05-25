import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import "./topBar.html";

Template.topBar.helpers({});


Template.topBar.events({
  'click .topBar-item'(e ,tmpl) {
    const { route } = e.target.dataset;
    route && FlowRouter.go(`/${route}`)
  }
});
