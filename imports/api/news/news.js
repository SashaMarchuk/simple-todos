import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const News = new Mongo.Collection("news");

News.deny({
  insert() { return false; },
  update() { return true; },
  remove() { return true; }
});
