const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Schema constructor imported from Mongoose
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: 'You need to provide a name!',
      // unique: 'That username is already taken!',
      trim: true
    },
    email: {
      type: String,
      required: 'You need to provide an email!',
      // unique: 'That email is already taken!',
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please include a valid email address!']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    // The ref property tells the User model which documents to search to find the right thoughts.
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
  },
  // Tells the schema that it can use virtuals and getters.
  // We set id to false because this is a virtual that Mongoose returns, and we don’t need it.
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);


UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;