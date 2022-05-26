import { Meteor } from 'meteor/meteor';

import { Tasks } from "../tasks";

Meteor.publish("allTasks", function (limit) {
  const query = {
    $or: [{ private: { $ne: true } }, { owner: this.userId }],
  };
  const options = { limit: limit || 10 };
  return Tasks.find(query, options);
});
