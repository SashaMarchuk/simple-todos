import { Template } from 'meteor/templating';
import './adminPanel.html';

// As example all available Template's callbacks
Template.adminPanel.onCreated(function () { /* ... */ });
Template.adminPanel.onRendered(function () { /* ... */ });
Template.adminPanel.onDestroyed(function () { /* ... */ });
Template.adminPanel.helpers({ /* ... */ });
Template.adminPanel.events({ /* ... */ });