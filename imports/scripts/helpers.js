import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';

Template.registerHelper('formatDate', function (date, format) {
  return moment(date).format(typeof format !== 'string' ? 'MMM DD, YYYY' : format);
});