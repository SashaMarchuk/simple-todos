import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../../../api/tasks/tasks';

import './todoPage.html';

import '../../components/taskItem/taskItem';

Template.todoPage.onCreated(function () {
  TemplateVar.set('hideCompleted', false);
});

Template.todoPage.helpers({
  tasks() {
    const hideCompleted = TemplateVar.get('hideCompleted');
    const query = { ...(hideCompleted && { checked: { $ne: true } }) };
    const options = { sort: { createdAt: -1 } };
    return Tasks.find(query, options);
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  }
});
Template.todoPage.events({
  'submit .new-task'(e, tmpl) {
    e.preventDefault();
    const target = e.target;
    const text = e.target.text.value;

    e.target.text.disabled = true;
    Meteor.call('tasks.insert', text, (err, res) => {
      if (err) {
        alert(err.reason || err.method || err.error);
        e.target.checked = !checked;
      }
      e.target.text.disabled = false;
      target.text.value = '';
    });
  },
  'change .hide-completed input'(e, tmpl) {
    const { checked } = e.target;
    TemplateVar.set('hideCompleted', checked);
  }
});
