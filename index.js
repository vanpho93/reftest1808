const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.post('/post', parser, (req, res) => {
    //Co 1 post trong db
});

app.listen(3000, () => console.log('Server started!'));
