import { Template } from 'meteor/templating';
import './defaultLayout.html';
import '../components/topBar/topBar'

Template.defaultLayout.onCreated(function () {
});
Template.defaultLayout.onRendered(function () { /* ... */ });
Template.defaultLayout.onDestroyed(function () { /* ... */ });
Template.defaultLayout.helpers({ /* ... */ });
Template.defaultLayout.events({ /* ... */ });