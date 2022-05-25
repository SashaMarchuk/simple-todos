import { Tasks } from "../tasks";

Meteor.publish("tasks", function (limit) {
  const query = {
    $or: [{ private: { $ne: true } }, { owner: this.userId }],
  };
  const options = { limit };
  return Tasks.find(query, options);
});
