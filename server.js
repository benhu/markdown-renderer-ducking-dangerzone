var express     = require('express'),
    fs          = require('fs'),
    md          = require('marked'),
    app         = express(),
    router      = express.Router(),
    port        = 1222;

app.set('view engine', 'jade');

router.get('/:fileName', function(req, res) {
    var file = './markdown/' + req.params.fileName;

    fs.readFile(file, 'utf8', function(err, data) {
        if(err) {
            return console.log(err);
        }
        md(data, function(err, content){
            if(err){
                return console.log(err);
            }
            //res.send(content);
            res.render('index', {
                title: 'Markdown',
                markdownContent: content
            });
        });
    });
});

app.use('/', router);
app.use('/static', express.static('public'));

app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Not Found');
});

app.listen(port);

console.log('Markdown-html rocking on port ' + port);
