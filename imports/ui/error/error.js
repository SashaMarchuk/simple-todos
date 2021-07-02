import { Template } from 'meteor/templating';
import './error.html';

// As example all available Template's callbacks
Template.error.onCreated(function () { /* ... */ });
Template.error.onRendered(function () { /* ... */ });
Template.error.onDestroyed(function () { /* ... */ });
Template.error.helpers({ /* ... */ });
Template.error.events({ /* ... */ });