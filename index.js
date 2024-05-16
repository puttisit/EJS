const express = require('express');
const mysql = require("mysql2/promise");
const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root', // <== ระบุให้ถูกต้อง
    password: '',  // <== ระบุให้ถูกต้อง
    database: 'student_database',
    port: 3306  // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)
});

app.get('/', async (req, res) => {
   // Replace this with your database query
    const connection = await dbConn
    const users = await connection.query('SELECT * from students')
    console.log(users)
    res.render('index', { users:users[0] });
});

app.get('/submit', async (req, res) => {
  res.sendFile(__dirname + '/submit.html');
});
  // กำหนดเส้นทางสำหรับรับข้อมูลจากฟอร์ม
app.use(express.urlencoded({ extended: true }));
app.post('/submit', async (req, res) => {
  const name = req.body.names;
  const age = req.body.ages;
  const phone = req.body.phones;
  const email = req.body.email;

  try {
    const connection = await dbConn;
    const sql = 'INSERT INTO students (name, age, phone, email) VALUES (?, ?, ?, ?)';
    await connection.query(sql, [name, age, phone, email]);
    console.log('บันทึกข้อมูลสำเร็จ');

    // Fetch the updated user data from the database
    const users = await connection.query('SELECT * from students');
    res.render('index', { users: users[0] });
  } catch (err) {
    console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', err);
    res.status(500).send('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));



 
   
   