import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../ui/layout/defaultLayout'
import '../ui/pages/adminPage/adminPage'
import '../ui/pages/errorPage/errorPage'
import '../ui/pages/todoPage/todoPage'

FlowRouter.route('/', {
  name: 'startPage',
  action() {
    FlowRouter.go('/main');
  }
});

FlowRouter.route('/main', {
  name: 'main',
  subscriptions: () => {},
  action: function () {
    console.log('here (main)');
    console.log('BlazeLayout: ', BlazeLayout);
    BlazeLayout.render('defaultLayout', {
      main: 'errorPage'
    });
    console.log('after here (main)');
    // if (!Meteor.userId()) {
    // } else {
    //   FlowRouter.go('/dashboard');
    // }
  }
});

FlowRouter.route('/admin', {
  name: 'admin',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'adminPage'
    });
  }
});

FlowRouter.route('/todo', {
  name: 'todo',
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
