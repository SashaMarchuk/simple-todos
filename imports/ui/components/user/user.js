import { Template } from 'meteor/templating';
import './user.html';
import '../pages/adminPage/adminPage'
import '../pages/errorPage/errorPage'
import '../pages/todoPage/todoPage'

Template.user.onCreated(function () { /* ... */ });
Template.user.onRendered(function () { /* ... */ });
Template.user.onDestroyed(function () { /* ... */ });
Template.user.helpers({ /* ... */ });
Template.user.events({ /* ... */ });