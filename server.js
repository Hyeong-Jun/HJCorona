const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');

// db와 연동
// db관련 정보는 git ignore 설정을 통해 github에 올라가지 않도록 한다
// db의 id와 pw를 하드코딩하면 github에 올라가서 다른 이용자들에게 유출됨


app.use(bodyParser.json());
console.log(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

const multer = require('multer'); // 고객데이터 삽입요청, 파일명이 중복되지 않도록 함, aws s3
const upload = multer({dest: './upload'}) // 사용자로부터 프로필 이미지도 전달받아서 파일처리를 위해 별도의 라이브러리 사용
// 실제로는 새롭게 추가된 것만 가져오는 방식으로 구현해보자

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM USER",
        (err, rows, fields)=>{
            res.send(rows);
            console.log(rows);
            console.log(err);
            console.log("Select Success");
        }
    );
    // res.send([ // json형식으로 받아온다
    //     {
    //         'id': 1,
    //         'image': 'https://placeimg.com/64/64/1',
    //         'name': '이형준',
    //         'birthday': '970000',
    //         'gender': '남자',
    //         'job': '대학생'
    //     },
    //     {
    //         'id': 2,
    //         'image': 'https://placeimg.com/64/64/2',
    //         'name': '이형준',
    //         'birthday': '970000',
    //         'gender': '남자',
    //         'job': '대학생'
    //     }
    // ]);
});
// 필요할때마다 서버에게 데이터를 요청해서 화면에 보여준다

app.use('/image', express.static(__dirname + '/upload')); // 이를 통해서 /image 경로를 통해 uploads 디렉토리에 포함된 파일을 로드할 수 있음
app.post('/api/customers', upload.single('image'), (req, res)=>{
    let sql='INSERT INTO USER VALUES (null, ?, ?, ?, ?, ?) ';
    let image = '/image/' + req.file.filename; // binary 명
    let name = req.body.name;
    console.log("name:",req.body.name);
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    console.log(image);
    console.log(name);
    console.log(birthday);
    console.log(gender);
    console.log(job);
    let params = [image, name, birthday, gender, job];
    console.log(params);
    connection.query(sql, params,
        (err, rows, fields)=>{
            res.send("hello:", rows);
            console.log(err);
            console.log(rows);
        })
});

app.listen(port, ()=>console.log(`Listening on port ${port}`));