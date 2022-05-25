import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Tasks = new Mongo.Collection("tasks");


const TasksSchema = new SimpleSchema({
  // _id: { type: String },
  // userId: { type: String },
  // name: { type: String },
  // createdAt: { type: Date },
  // changedAt: { type: Date, optional: true },
  // isDeleted: { type: Boolean, defaultValue: false },
  // teamId: { type: String, optional: true },
  // logo: { type: String, optional: true },
  // sharedUsers: { type: Array, defaultValue: [] },
  // 'sharedUsers.$': { type: String, optional: true },
  // sharedUsersData: { type: Object, defaultValue: {}, blackbox: true }
});

Tasks.attachSchema(TasksSchema);

Tasks.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Tasks.methods({

});

