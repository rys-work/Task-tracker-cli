const fs = require("fs");
if (!fs.existsSync("./task.json")) {
  fs.writeFileSync("./task.json", "[]");
}

class Task {
  static id = getLastTaskId() + 1;
  constructor(description, status, createdAt, updatedAt) {
    this.id = Task.id;
    this.description = description;
    this.status = status === (null || undefined) ? "todo" : status;
    this.createdAt =
      createdAt === (null || undefined) ? new Date().toUTCString() : createdAt;
    this.updatedAt =
      updatedAt === (null || undefined) ? this.createdAt : updatedAt;
  }
  static addTask = taskName => {
    const newTask = new Task(taskName);
    const jsonData = JSON.parse(fs.readFileSync("./task.json"));
    jsonData.push(newTask);
    fs.writeFileSync("./task.json", JSON.stringify(jsonData));
  };
  static updateTask = (taskId, taskName) => {
    const jsonData = JSON.parse(fs.readFileSync("./task.json"));
    jsonData.forEach(element => {
      if (element.id == taskId) {
        element.description = taskName;
        element.updatedAt = new Date().toUTCString();
      }
    });
    fs.writeFileSync("./task.json", JSON.stringify(jsonData));
  };
  static deleteTask = (taskId) => {
    const jsonData = JSON.parse(fs.readFileSync("./task.json"));
    fs.writeFileSync("./task.json", JSON.stringify(jsonData.filter(item => item.id != taskId)));
  }
}

function getLastTaskId() {
  const data = JSON.parse(fs.readFileSync("./task.json", "utf-8"));
  if (data.length === 0) return 0;
  return data[data.length - 1].id;
}

if (!process.argv[1].endsWith("task-cli")) {
  console.log("Invalid Argument");
} else if (process.argv[2] == "add") {
  Task.addTask(process.argv[3]);
  console.log(`Output: Task added successfully (ID: ${Task.id})`);
} else if (process.argv[2] == "update") {
  Task.updateTask(process.argv[3], process.argv[4]);
} else if (process.argv[2] == "delete") {
  Task.deleteTask(process.argv[3]);
}
