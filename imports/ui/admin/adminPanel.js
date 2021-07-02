import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { ReactiveDict } from "meteor/reactive-dict";
import { User } from "../../api/users/users.js";
import "./adminPanel.html";

function updateSession(value) {
  Session.set("limit", {
    limit: Session.get("limit").limit + value,
  });
}

// As example all available Template's callbacks

Template.adminPanel.onCreated(function () {
  Session.setDefault("limit", {
    limit: 5,
  });
  Template.instance().autorun(function () {
    Template.instance().subscribe("userData", Session.get("limit").limit);
  });
  this.state = new ReactiveDict();
  // Meteor.subscribe("userData");

  // Session.setDefault("limit", {
  //   limit: 2,
  // });
  // Template.instance().autorun(function () {
  //   Template.instance().subscribe("tasks", Session.get("limit").limit);
  // });
  // // this.state = new ReactiveDict();
  // // Meteor.subscribe("tasks");
});
Template.adminPanel.onRendered(function () {
  /* ... */
});
Template.adminPanel.onDestroyed(function () {
  /* ... */
});
Template.adminPanel.helpers({
  users() {
    // Meteor.users.find().forEach(function(user) {
    // 	console.log(user);
    // })

    return Meteor.users.find({}, { sort: { createdAt: -1 } });
  },
  // userData() {
  //   console.log(db.users.find());
  //   return Meteor.users.find();

  //   //		return Users2.find();
  // },
  isDisabled() {
    const countAllUsers = Counts.get('users');
    return countAllUsers == Meteor.users.find().count()
      ? { disabled: "disabled" }
      : {};
  },
});
Template.adminPanel.events({
  "click .toggle-checked-ban"() {
    // Set the checked property to the opposite of its current value
    Meteor.call("users.setCheckedBan", this._id, !this.ban);
  },
  "click .load-more": function () {
    updateSession(5);
  },

});
