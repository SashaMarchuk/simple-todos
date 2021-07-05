import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import '../ui/body.js';
import '../ui/task.js'
import '../ui/admin/adminPanel.js';
import '../ui/start.js';
import '../ui/todos/todosList.js'
import '../ui/error/error.js'

FlowRouter.route('/', {
  name: 'startPage',
  action() {
    this.render('start');
  }
});

FlowRouter.route('/admin', {
  name: 'admin',
  action() {
    this.render('adminPanel');
  }
});

FlowRouter.route('/todos', {
  name: 'todos',
  action() {
    this.render('todosList');
  }
});

FlowRouter.route('*', {
  action() {
    this.render('error');
  }
});
