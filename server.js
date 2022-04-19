const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req, res) => {
    res.send([ // json형식으로 받아온다
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name': '이형준',
            'birthday': '970000',
            'gender': '남자',
            'job': '대학생'
        },
        {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '이형준',
            'birthday': '970000',
            'gender': '남자',
            'job': '대학생'
        }
    ]);
});
// 필요할때마다 서버에게 데이터를 요청해서 화면에 보여준다

app.listen(port, ()=>console.log(`Listening on port ${port}`));