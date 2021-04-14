const { User, Thought } = require('../models');

const userController = {
  // get all users
  // will serve as the callback function for the GET /api/users route
  getAllUsers(req, res) {
    // Telling Mongoose that we don't care about the __v field on user or thoughts. The minus sign - in front of the 
    // field for thoughts indicates that we don't want it to be returned. If we didn't have it, it would mean that
    // it would return only the __v field. For user it just adds unnecessary noise
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one user by id -- instead of accessing entire req, destructured params out of it
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // createUser
  // we destructured the body out of the Express.js req object because we 
  // don't need to interface with any of the other data it provides
  createUser({ body }, res) {
    console.log("this is the body", body)
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  // update user by id
  // if we don't set that third parameter, { new: true }, it will return the original document. 
  updateUser({ params, body }, res) {
    // By setting the parameter new to true, we're instructing Mongoose to return the new version of the document.
    // update user by id
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
  
  // delete user by id
  // deleteUser({ params }, res) {
  //   User.findOneAndDelete(
  //     { _id: params.id })
  //     .then(dbUserData => {
  //       console.log("this is dbUserData ", dbUserData.thoughts)

  //       if (!dbUserData) {
  //         res.status(404).json({ message: 'No user found with this id!' });
  //         return;
  //       }
  //       res.json(dbUserData);
  //     })
  //     .catch(err => res.status(400).json(err));
  // },
  deleteUser({ params }, res) {
    User.findOneAndDelete(
      { _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        if (dbUserData.thoughts && dbUserData.thoughts.length > 0) {
          console.log("this is dbUserData ", dbUserData.thoughts)
          return Thought.deleteMany(
            { _id: {$in: dbUserData.thoughts } } 
          )
        } else return dbUserData;
      })
      .then(dbThoughtData => {
        console.log("dbThoughtData", dbThoughtData)
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  addFriend({ params }, res) {
    console.log("addFriend params ", params)
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } } ,
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        console.log("addFriend dbUserData ", dbUserData)
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // remove friend
  // using the MongoDB $pull operator to remove the specific friend from the friends array
  // where the friendId matches the value of params.friendId passed in from the route.
  removeFriend({ params }, res) {
    console.log("removeFriend params ", params)
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      console.log("removeFriend dbUserData ", dbUserData)
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  }

}

module.exports = userController;

// In MongoDB, the methods for adding data to a collection are .insertOne() or .insertMany(). 
// But in Mongoose, we use the .create() method, which will actually handle either one or multiple inserts!
// There are also Mongoose and MongoDB methods called .updateOne() and .updateMany(), which update documents without returning them.