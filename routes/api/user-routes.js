const router = require('express').Router();

// Instead of importing the entire object and having to do pizzaController.getAllPizza(), we can simply destructure 
// the method names out of the imported object and use those names directly
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
// /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;