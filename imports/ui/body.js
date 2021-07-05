import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { ReactiveDict } from "meteor/reactive-dict";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

import { Tasks } from "../api/tasks.js";

import "./body.html";
import "./task/task.js";
import "../lib/router.js";
import "./todos/todosList.js";
import "./admin/adminPanel.js";



// As example all available Template's callbacks
Template.body.onCreated(function () {
  /* ... */
});
Template.body.onRendered(function () {
  /* ... */
});
Template.body.onDestroyed(function () {
  /* ... */
});
Template.body.helpers({
  /* ... */
});
Template.body.events({
  "click .goToAdmin"() {
    FlowRouter.go('/admin');
  },
  "click .goToMain"() {
    FlowRouter.go('/');
  },
  "click .goToTodos"() {
    FlowRouter.go('/todos');
  },

});
