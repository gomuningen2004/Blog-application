// models/User.js
import bcrypt from 'bcryptjs';

const users = [];

export function addUser(username, password) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ id: users.length + 1, username, password: hashedPassword });
}

export function findUserByUsername(username) {
  return users.find(user => user.username === username);
}

export function findUserById(id) {
  return users.find(user => user.id === id);
}
