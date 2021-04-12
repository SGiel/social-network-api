const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router 
  .route('/')
  .get(getAllThoughts)

// /api/thoughts/<userId>
router
  .route('/:userId')
  .post(addThought);
  
  // /api/thoughts/<userId>/<thoughtId>
  // Remember that the callback function of a route method has req and res as parameters, so we don't have to
  // explicitly pass any arguments to addReaction.
  
  // This is a PUT route, instead of a POST, because technically we're not creating a new reactuib resource. 
  // Instead, we're just updating the existing thought resource
  router
    .route('/:userId/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);
    
  router
    .route('/:userId/:thoughtId/reactions')
    .put(addReaction);

  router
    .route('/:userId/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;