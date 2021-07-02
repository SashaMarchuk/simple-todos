import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
// Import layout and loading templates statically as it will be used a lot

// import '../../imports/ui/body.js';
import '../ui/body.js';
// import '../../imports/ui/task.js'
import '../ui/task.js'
// import '../../client/admin/adminPanel.js'
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
    // Render a template using Blaze
    this.render('adminPanel');

    // Can be used with BlazeLayout,
    // and ReactLayout for React-based apps
  }
});

FlowRouter.route('/todos', {
  name: 'todos',
  action() {
    this.render('todosList');
  }
});

// FlowRouter.route('/body', {
//   name: 'todos',
//   action() {
//     // Render a template using Blaze
//     console.log("ready");

//     this.render('body');

//     // Can be used with BlazeLayout,
//     // and ReactLayout for React-based apps
//   }
// });

// Create 404 route (catch-all)
FlowRouter.route('*', {
  action() {
    // Show 404 error page using Blaze
    this.render('error');

    // Can be used with BlazeLayout,
    // and ReactLayout for React-based apps
  }
});
