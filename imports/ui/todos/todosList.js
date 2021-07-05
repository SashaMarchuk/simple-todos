import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { ReactiveDict } from "meteor/reactive-dict";

import { Tasks } from "../../api/tasks.js";

import "../task.js";
import "./todosList.html";
import "../../lib/router.js";

Template.todosList.onCreated(function todosListOnCreated() {
  Session.setDefault("limit", {
    limit: 2,
  });
  Template.instance().autorun(function () {
    Template.instance().subscribe("tasks", Session.get("limit").limit);
  });
  this.state = new ReactiveDict();

});

const updateSession = (value) => {
  Session.set("limit", {
    limit: Session.get("limit").limit + value,
  });
}

Template.todosList.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get("hideCompleted")) {
      return Tasks.find(
        { checked: { $ne: true } },
        { sort: { createdAt: -1 } }
      );
    }

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
  "submit .new-task"(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    Meteor.call("tasks.insert", text);
    target.text.value = "";
  },
  "change .hide-completed input"(event, instance) {
    instance.state.set("hideCompleted", event.target.checked);
  },
  "click .load-more": function () {
    updateSession(2);
  },
});
