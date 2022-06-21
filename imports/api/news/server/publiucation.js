import { Meteor } from 'meteor/meteor';
import { Votes } from '../../votes/votes';

import { News } from '../news';

Meteor.publishComposite('news', function () {
  return {
    find() {
      const query = {};
      const options = { sort: { date: -1 } };
      return News.find(query, options);
    },
    children: [
      {
        find(news) {
          return Votes.find({ newsId: news._id });
        }
      }
    ]
  };
});
