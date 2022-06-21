import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { News } from '../../../api/news/news'; 

import './newsPage.html';

import '../../components/newsItem/newsItem'

Template.newsPage.onCreated(function () {
});

Template.newsPage.helpers({
  news() {
    const query = {};
    const options = { sort: { date: -1 }};
    return News.find(query, options);
  }
});
Template.newsPage.events({

});
