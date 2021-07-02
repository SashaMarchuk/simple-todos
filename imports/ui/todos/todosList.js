import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { ReactiveDict } from "meteor/reactive-dict";

import { Tasks } from "../../api/tasks.js";

import "../task.js";
import "./todosList.html";

// import "../body.html";

Template.todosList.onCreated(function todosListOnCreated() {
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
Template.todosList.helpers({
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
Template.todosList.events({
  'click .ban'() {
    Meteor.call('tasks.remove', this._id, !this.private);
    },
  "click .load-more": function () {
    updateSession(2);
  },
});
