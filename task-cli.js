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
    const newTask = new Task("");
    const jsonData = JSON.parse(fs.readFileSync("./task.json"))
    jsonData.push(newTask)
    fs.writeFileSync('./task.json',JSON.stringify(jsonData))
  };
}

function getLastTaskId() {
  const data = JSON.parse(fs.readFileSync("./task.json", 'utf-8'))
  if (data.length===0) return 0
  return  data[data.length - 1].id
}

if (!process.argv[1].endsWith("task-cli")) {
  console.log("Invalid Argument");
} else if (process.argv[2] == "add") {
  Task.addTask(process.argv[3]);
  console.log(`Output: Task added successfully (ID: ${Task.id})`);
}