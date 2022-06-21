import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Votes } from '../../../api/votes/votes';
import { News } from '../../../api/news/news';

import './newsItem.html';

Template.newsItem.onCreated(function () {
  TemplateVar.set('voteStatus', false);
  TemplateVar.set('notification', false);
  const tmpl = Template.instance();
});
Template.newsItem.helpers({
  isOwner(ownerId) {
    return ownerId && ownerId === Meteor.userId();
  },
  voteByNews(newsId, type) {
    return Votes.findOne({ newsId })?.type === type && 'active';
  }
});

Template.newsItem.events({
  'change .toggle-checked'(e, tmpl) {
    const { checked } = e.target;
    const { _id } = this.taskData;
    e.target.disabled = true;
    Meteor.call('tasks.setChecked', _id, checked, (err, res) => {
      err && alert('Can not set checked for this task');
      e.target.disabled = false;
    });
  },
  'click .delete'() {
    const { _id } = this.taskData;
    Meteor.call('tasks.remove', _id);
  },
  'click .toggle-private'(e, tmpl) {
    const { _id } = this.taskData;
    const taskPrivateStatus = this.taskData.private;
    e.target.disabled = true;
    Meteor.call('tasks.setPrivate', _id, !taskPrivateStatus, (err, res) => {
      err && console.error('Error on set private task');
      e.target.disabled = false;
    });
  },
  'click .vote'(e, tmpl) {
    const userId = Meteor.userId();
    if (userId) {
      const { type } = e.currentTarget.dataset;
      const { _id } = this;
      TemplateVar.set('voteStatus', true);
      const options = { type, newsId: _id, createdAt: new Date(), userId, isNews: true };
      console.log('options: ', options);
      Meteor.call('setVote', options, (err, res) => {
        err && console.error('Error on set vote', err);
        if (res) {
          TemplateVar.set(tmpl, 'notification', res);
          setTimeout(() => {
            TemplateVar.set(tmpl, 'notification', false);
          }, 5000);
        }
        TemplateVar.set(tmpl, 'voteStatus', false);
      });
    }
  }
});
