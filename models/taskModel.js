class Task {
  constructor(id, title, description, userId, completed = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.completed = completed;
  }
}

module.exports = Task;