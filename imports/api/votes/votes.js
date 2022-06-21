import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import SimpleSchema from 'simpl-schema';

export const Votes = new Mongo.Collection("votes");


const VotesSchema = new SimpleSchema({
  _id: { type: String },
  userId: { type: String },
  newsId: { type: String, optional: true },
  taskId: { type: String, optional: true },
  type: { type: String, allowedValues: ['like', 'dislike'] },
  createdAt: { type: Date, defaultValue: new Date() },
  isDeleted: { type: Boolean, defaultValue: false }
});

Votes.attachSchema(VotesSchema);

Votes.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

// Tasks.methods({

// });

