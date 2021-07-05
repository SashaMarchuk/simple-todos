import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { ReactiveDict } from "meteor/reactive-dict";
import { User } from "../../api/users/users.js";

import "./adminPanel.html";

const updateSession = (value) => {
  Session.set("limit", {
    limit: Session.get("limit").limit + value,
  });
};

Template.adminPanel.onCreated(function () {
  Session.setDefault("limit", {
    limit: 4,
  });
  Template.instance().autorun(function () {
    Template.instance().subscribe("userData", Session.get("limit").limit);
  });
  this.state = new ReactiveDict();
});
Template.adminPanel.onRendered(function () {
  /* ... */
});
Template.adminPanel.onDestroyed(function () {
  /* ... */
});
Template.adminPanel.helpers({
  users() {
    return Meteor.users.find({}, { sort: { createdAt: -1 } });
  },

  isDisabled() {
    const countAllUsers = Counts.get("users");
    return countAllUsers == Meteor.users.find().count()
      ? { disabled: "disabled" }
      : {};
  },
  createdAt(createdAt) {
    return moment(createdAt).format("LLL");
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
