const express = require('express');
const mysql = require("mysql2/promise");
const app = express();
app.set('view engine', 'ejs');

app.use(express.static("public"))

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
app.listen(3000, () => console.log('Server running on port 3000'));

//   app.get('/submit', (req, res) => {
//     res.sendFile(__dirname + '/submit.html');
//   });
   
  // กำหนดเส้นทางสำหรับรับข้อมูลจากฟอร์ม
  app.use(express.urlencoded({ extended: true }));
  app.post('/submit', (req, res) => {
    const name = req.body.names;
    const age = req.body.ages;
    const phone = req.body.phones;
    const email = req.body.email;
    // บันทึกข้อมูลลงในฐานข้อมูล
    // ใช้โค้ดสำหรับเชื่อมต่อและบันทึกข้อมูลลงในฐานข้อมูลที่คุณใช้ เช่น MySQL, MongoDB, ฯลฯ
    // ตัวอย่างโค้ดด้านล่างเป็นการบันทึกข้อมูลลงใน MySQL โดยใช้ mysql2
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root', // <== ระบุให้ถูกต้อง
        password: '',  // <== ระบุให้ถูกต้อง
        database: 'student_database',
        port: 3306  // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)
    });
    const sql = 'INSERT INTO students (name, age, phone, email) VALUES (?, ?, ?, ?)';
  connection.query(sql, [name, age, phone, email], (err, result) =>{
      if (err) throw err;
      console.log('บันทึกข้อมูลสำเร็จ');
      res.send('บันทึกข้อมูลสำเร็จ');
      
    });
  });

  app.get('/submit', async (req, res) => {
    // Replace this with your database query
    const connection = await dbConn
    const users = await connection.query('SELECT * from students')
    console.log(users)
    res.render('index', { users:users[0] });
  });
   
   