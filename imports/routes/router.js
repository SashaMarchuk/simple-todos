import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../ui/layout/defaultLayout'
import '../ui/pages/adminPage/adminPage'
import '../ui/pages/errorPage/errorPage'
import '../ui/pages/todoPage/todoPage'
import '../ui/pages/descriptionPage/descriptionPage'
import '../ui/pages/newsPage/newsPage'

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

FlowRouter.route('/news', {
  name: 'news',
  subscriptions: function (query, params) {
    this.register('news', Meteor.subscribe('news'));
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'newsPage'
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
