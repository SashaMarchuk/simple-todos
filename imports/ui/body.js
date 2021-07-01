import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { ReactiveDict } from "meteor/reactive-dict";

import { Tasks } from "../api/tasks.js";

import "./task.js";
import "./body.html";

Template.body.onCreated(function bodyOnCreated() {
  Session.setDefault("limit", {
    limit: 2,
  });
  Template.instance().autorun(function () {
    Template.instance().subscribe("tasks", Session.get("limit").limit);
  });
  this.state = new ReactiveDict();
  // Meteor.subscribe("tasks");
});

function updateSession(value) {
  Session.set("limit", {
    limit: Session.get("limit").limit + value,
  });
}
Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get("hideCompleted")) {
      // If hide completed is checked, filter tasks
      return Tasks.find(
        { checked: { $ne: true } },
        { sort: { createdAt: -1 } }
      );
    }
    // Otherwise, return all of the tasks

    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
  isDisabled() {
    const countAllTasks = Counts.get(`tasks`);
    return countAllTasks == Tasks.find().count()
      ? { disabled: "disabled" }
      : {};
  },
});
Template.body.events({
  "submit .new-task"(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Meteor.call("tasks.insert", text);

    // Clear form
    target.text.value = "";
  },
  "change .hide-completed input"(event, instance) {
    instance.state.set("hideCompleted", event.target.checked);
  },
  "click .load-more": function () {
    updateSession(2);
  },
});
