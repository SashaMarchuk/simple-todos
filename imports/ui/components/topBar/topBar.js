import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import "./topBar.html";

Template.topBar.helpers({
  activeRoute(tab) {
    return tab && FlowRouter.getRouteName() === tab;
  },
  tabsList() {
    return ['admin', 'todo', 'description']
  }
});


Template.topBar.events({
  'click .topBar-item'(e ,tmpl) {
    const { route } = e.target.dataset;
    return route && FlowRouter.go(`/${route}`)
  }
});
