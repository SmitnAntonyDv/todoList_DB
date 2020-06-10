const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const User = require("./models").user;
const TodoList = require("./models").todoList;
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Create a new user account
app.post("/users", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

//read user's info
app.get("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (e) {
    next(e);
  }
});

//update user's info
app.put("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      res.status(404).send("User not found");
    } else {
      const updatedUser = await userToUpdate.update(req.body);
      res.json(updatedUser);
    }
  } catch (e) {
    next(e);
  }
});

//get get all user's tasks
app.get("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, {
      include: [TodoList],
    });
    if (user) {
      res.send(user.TodoLists);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    next(e);
  }
});

//get a single user task
app.get("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const listId = req.params.listId;
    const user = await User.findByPk(userId, {
      include: [TodoList],
    });
    res.send(user);
  } catch (e) {
    next(e);
  }
});

//create a new list for user
app.post("/users/:userId/lists", async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findByPk(userId);
  if (!user) {
    res.status(404).send("user not found");
  } else {
    const newList = await TodoList.create({ userId, ...req.body });
    res.send(newList);
  }
});

//update an existing list
app.put("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const listToUpdate = await TodoList.findByPk(userId);
    if (!listToUpdate) {
      res.status(404).send("list not found");
    } else {
      const updated = await listToUpdate.update(req.body);
      res.send(updated);
    }
  } catch (e) {
    next(e);
  }
});

//delete a user's list
app.delete("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const { listId } = req.params;
    const deleteUserList = await TodoList.findByPk(listId);
    if (!deleteUserList) {
      res.status(404).send("Users list not found");
    } else {
      const deleted = await deleteUserList.destroy();
      res.send(deleted);
    }
  } catch (e) {
    next(e);
  }
});

// delete all user's lists
app.delete("/users/:userId/lists", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const toDelete = await User.findByPk(userId, { include: TodoList });
    if (!toDelete) {
      res.status(404).send("user not found");
    } else {
      res.json(
        toDelete.todoLists.forEach((list) => {
          list.destroy();
        })
      );
    }
  } catch (e) {
    next(e);
  }
});

//todoLists
app.get("/todoLists", async (req, res, next) => {
  try {
    const todolists = await TodoList.findAll();
    res.send(todolists);
  } catch (e) {
    next(e);
  }
});
app.post("/todoLists", async (req, res, next) => {
  try {
    const newList = await TodoList.create(req.body);
    res.json(newList);
  } catch (e) {
    next(e);
  }
});
app.put("/todoLists/:listId", async (req, res, next) => {
  try {
    const listId = req.params.listId;
    const listToUpdate = await TodoList.findByPk(listId);
    if (!listToUpdate) {
      res.status(404).send("TodoList not found");
      console.log("hello");
    } else {
      const updatedList = await listToUpdate.update(req.body);
      res.json(updatedList);
    }
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
