/**
 * Created by 순우 on 2017-11-05.
 */
var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.get('/template', function (req, res) {
    res.render('components/TopMenu_Component_KSW');
});
app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});

