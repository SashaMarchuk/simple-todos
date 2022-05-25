import { Template } from "meteor/templating";
import "./errorPage.html";

Template.errorPage.onCreated(function () {
  console.log("errorPage");
});
Template.errorPage.onRendered(function () {
  /* ... */
});
Template.errorPage.onDestroyed(function () {
  /* ... */
});
Template.errorPage.helpers({
  /* ... */
});
Template.errorPage.events({
  /* ... */
});
