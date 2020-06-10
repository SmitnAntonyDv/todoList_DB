const { user, todoItem, todoList, tag } = require("./models");

// getting TodoLists with some information about User who owns them
async function listsWithUsers() {
  const lists = await todoList.findAll({
    include: [user],
  });

  return lists.map((list) => list.get({ plain: true }));
}
// listsWithUsers().then((lists) => console.log(lists));

//
//only include the name of our Users with lists
async function listsWithUsers() {
  const lists = await todoList.findAll({
    include: [{ model: user, attributes: ["name"] }],
  });
  return lists.map((list) => list.get({ plain: true }));
}
// listsWithUsers().then((lists) => console.log(lists));

async function getUsers() {
  const allUsers = await user.findAll({
    include: { model: todoList, attributes: ["name"] },
  });
  return allUsers.map((user) => user.get({ plain: true }));
}

// getUsers().then((users) => console.log(users));

async function getUserByIdWithLists(id) {
  const userById = await user.findByPk(id, {
    include: [todoList],
  });
  return userById.get({ plain: true });
}
// getUserByIdWithLists(1).then((usersWithList) => console.log(usersWithList));

async function getImportantTodo() {
  const todo = await todoItem.findAll({
    where: { important: true },
    include: { model: todoList, attributes: ["name"] },
  });
  return todo.map((items) => items.get({ plain: true }));
}
// getImportantTodo().then((todo) => console.log(todo));

async function fullUserById(id) {
  const result = await user.findByPk(id, {
    include: [
      {
        model: todoList,
        attributes: ["name"],
        include: { model: todoItem, attributes: ["task"] },
      },
    ],
  });
  return result.get({ plain: true });
}

// fullUserById(1).then((user) => console.log("User with tasks", user));

//query finding all todoItems with corresponding tags.
async function getTodoItemTags() {
  const result = await todoItem.findAll({
    include: [tag],
  });
  return result.map((tag) => tag.get({ plain: true }));
}
getTodoItemTags().then((tags) => console.log(tags));
