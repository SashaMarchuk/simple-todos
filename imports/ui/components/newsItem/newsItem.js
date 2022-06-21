import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Votes } from '../../../api/votes/votes';
import { News } from '../../../api/news/news';

import './newsItem.html';

Template.newsItem.onCreated(function () {
  TemplateVar.set('voteStatus', false);
  const tmpl = Template.instance();
  console.log('News: ', tmpl.data?.news);
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
    console.log('this: ', this);
    if (userId) {
      const { type } = e.currentTarget.dataset;
      console.log('type: ', type);
      const { _id } = this;
      console.log('_id: ', _id);
      TemplateVar.set('voteStatus', true);
      const options = { type, newsId: _id, createdAt: new Date(), userId };
      console.log('options: ', options);
      Meteor.call('setVote', options, (err, res) => {
        err && console.error('Error on set vote', err);
        console.log(res);
        TemplateVar.set(tmpl, 'voteStatus', false);
      });
    }
  }
});
