const { User } = require('../models');

const UserController = {
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
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  }
}

module.exports = userController;

// In MongoDB, the methods for adding data to a collection are .insertOne() or .insertMany(). 
// But in Mongoose, we use the .create() method, which will actually handle either one or multiple inserts!
// There are also Mongoose and MongoDB methods called .updateOne() and .updateMany(), which update documents without returning them.