import { Meteor } from 'meteor/meteor';
import { Votes } from '../../votes/votes';
import { publishComposite } from 'meteor/reywood:publish-composite';

import { Tasks } from '../tasks';

Meteor.publishComposite('allTasks', function () {
  return {
    find() {
      const query = {
        $or: [{ private: { $ne: true } }, { owner: this.userId }]
      };
      const options = {};
      return Tasks.find(query, options);
    },
    children: [
      {
        find(task) {
          return Votes.find({ taskId: task._id });
        }
      }
    ]
  };
});
