const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL server host
  user: 'your_mysql_user', // Replace with your MySQL username
  password: 'your_mysql_password', // Replace with your MySQL password
  database: 'online_furniture_store' // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to the database!');
});

module.exports = db;