import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Votes } from '../votes';
import { News } from '../../news/news';

Meteor.methods({
  setVote(options) {
    const { newsId, taskId, type, createdAt, userId, isNews } = options;
    const query = { userId, ...(taskId && { taskId }), ...(newsId && { newsId }) };
    const voteByEntity = Votes.findOne(query);
    let voteStatus;
    if (voteByEntity) {
      const query = { _id: voteByEntity._id, ...(taskId && { taskId }), ...(newsId && { newsId }), userId };
      voteStatus = voteByEntity.type === type ? Votes.remove(query) : Votes.update(query, { $set: { type, createdAt } });
    } else {
      voteStatus = Votes.insert({ userId, type, createdAt, ...(taskId && { taskId }), ...(newsId && { newsId }) });
    }
    if (isNews && type === 'like' && voteStatus && !voteByEntity) {  
      const news = News.findOne(newsId);
      const supposeNews = News.findOne({ author: news.author, _id: { $ne: newsId } }) || {};
      if (supposeNews.titleLink) {
        return supposeNews.titleLink
      }
    } else if (!voteStatus) throw new Meteor.Error('Can not set vote');
  }
});
