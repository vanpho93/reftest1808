const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const jsonParser = require('body-parser').json();
const mongoose = require('mongoose');

const User = require('./src/User');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.post('/post', parser, (req, res) => {
    //Co 1 post trong db
    const { userId, title, content } = req.body;
    User.addPostById(userId, title, content)
    .then(() => res.send({ message: 'OK' }))
    .catch(err => res.send({ error: err.message }));
});

app.post('/user', parser, async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send({ message: 'OK' });
});

app.get('/cong/:a/:b', parser, (req, res) => {
    const { a, b } = req.params;
    const kq = +a + +b + '';
    if (isNaN(kq)) return res.status(404).send('Tham so khong hop le'); 
    res.status(200).send(kq);
});

app.post('/cong', jsonParser, (req, res) => {
    const { a, b } = req.body;
    const kq = +a + +b + '';
    if (isNaN(kq)) return res.status(404).send('Tham so khong hop le'); 
    res.status(200).send(kq);
});

mongoose.connect('mongodb://localhost/shop', { useMongoClient: true });
mongoose.connection.once('open', () => {
    app.listen(3000, () => console.log('Server started!'));
});

module.exports = app;
