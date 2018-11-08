const express = require('express');
const formidable = require('express-formidable');
const fs = require('fs');

const app = express();

app.use(express.static('public'));
app.use(formidable());

app.post('/create-post', (req, res, next) => {
  fs.readFile(__dirname + '/data/posts.json', function(err, file) {
    let parsedFile = JSON.parse(file);
    parsedFile[Date.now()] = req.fields.blogpost;
    let stringFile = JSON.stringify(parsedFile);
    fs.writeFile(__dirname + '/data/posts.json', stringFile, function(err) {
      console.log(stringFile.toString())
    });
  });
});

app.get('/get-posts', (req, res, next) => {
  res.sendFile(__dirname + '/data/posts.json');
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000. Ready to accept requests!')
});