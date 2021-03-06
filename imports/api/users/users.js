import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

if (Meteor.isServer) {
  Meteor.publish("userData", function userDataPublication(limit) {
    return Meteor.users.find(
      {},
      {
        fields: { username: 1, email: 1, createdAt: 1, ban: 1 },
        limit: limit,
        sort: { createdAt: -1 },
      },
      Counts.publish(this, "users", Meteor.users.find({}, {fields: {}}))
    );
  });
  Accounts.validateLoginAttempt(function (info) {
    const user = info.user;
    if (user.ban) throw new Meteor.Error(403, "You are banned");
    else return true;
  });
}

Meteor.methods({
  "users.setCheckedBan"(userId, setCheckedBan) {
    check(userId, String);
    check(setCheckedBan, Boolean);
    if (this.userId) {
      return Meteor.users.update(userId, { $set: { ban: setCheckedBan } });
    } else throw new Meteor.Error("not-authorized");
  },
});
