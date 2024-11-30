const pool = require('../config/db');

const School = {
  add: (name, address, latitude, longitude) => {
    return pool.execute(
      'INSERT INTO schools (NAME, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
  },
  getAll: () => {
    return pool.execute('SELECT * FROM schools');
  }
};

module.exports = School;