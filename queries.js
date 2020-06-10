const User = require("./models").user;
const TodoItems = require("./models").todoItem;

//Search for all users
async function getUsers() {
  const allUsers = await User.findAll();
  return allUsers.map((user) => user.get({ plain: true }));
}
//getUsers().then((users) => console.log(users));

//search for all todoItems
async function getTodoItems() {
  const allTodoItems = await TodoItems.findAll();
  return allTodoItems.map((todoItem) => todoItem.get({ plain: true }));
}
//getTodoItems().then((todoItem) => console.log("ALL TODO ITEMS", todoItem));

//search for a user with primaryKey
async function getSpecificUser(id) {
  const SpecificUser = await User.findByPk(id);
  console.log("specificUserById", SpecificUser.get({ plain: true }));
  return SpecificUser.get({ plain: true });
}
// getSpecificUser(1);

// add new user to database --users--
async function postUser({ name, email, phone }) {
  const newUser = await User.create({ name, email, phone });
  return newUser.get({ plain: true });
}
// postUser({
//   name: "Tony",
//   email: "test@hotmail.com",
//   phone: 123456789,
// }).then((result) => console.log(result));

async function importantTodo() {
  const todos = await TodoItems.findAll({ where: { important: true } });
  return todos.map((todo) => todo.get({ plain: true }));
}
importantTodo().then((result) => console.log(result));
