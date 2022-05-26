import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../ui/layout/defaultLayout'
import '../ui/pages/adminPage/adminPage'
import '../ui/pages/errorPage/errorPage'
import '../ui/pages/todoPage/todoPage'
import '../ui/pages/descriptionPage/descriptionPage'

FlowRouter.route('/', {
  name: 'startPage',
  action() {
    FlowRouter.go('/description');
  }
});

FlowRouter.route('/description', {
  name: 'description',
  subscriptions: () => {},
  action: function () {
    BlazeLayout.render('defaultLayout', {
      main: 'descriptionPage'
    });
  }
});

FlowRouter.route('/admin', {
  name: 'admin',
  subscriptions: function (query, params) {
    this.register('userData', Meteor.subscribe('userData'));
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'adminPage'
    });
  }
});

FlowRouter.route('/todo', {
  name: 'todo',
  subscriptions: function (query, params) {
    this.register('allTasks', Meteor.subscribe('allTasks'));
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'todoPage'
    });
  }
});

FlowRouter.route('*', {
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'error'
    });
  }
});
