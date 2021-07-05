import { Template } from 'meteor/templating';
import './start.html';

// As example all available Template's callbacks
Template.start.onCreated(function () { /* ... */ });
Template.start.onRendered(function () { /* ... */ });
Template.start.onDestroyed(function () { /* ... */ });
Template.start.helpers({ /* ... */ });
Template.start.events({ /* ... */ });