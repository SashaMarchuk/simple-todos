import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Votes } from '../votes';

Meteor.methods({
  setVote(options) {
    console.log('options: ', options);
    const { newsId, taskId, type, createdAt, userId } = options;
    const query = { userId, ...(taskId && { taskId }), ...(newsId && { newsId }) };
    const voteByEntity = Votes.findOne(query);
    if (voteByEntity) {
      const query = { _id: voteByEntity._id, ...(taskId && { taskId }), ...(newsId && { newsId }), userId };
      return voteByEntity.type === type ? Votes.remove(query) : Votes.update(query, { $set: { type, createdAt } });
    } else return Votes.insert({ userId, type, createdAt, ...(taskId && { taskId }), ...(newsId && { newsId }) });
  }
});
