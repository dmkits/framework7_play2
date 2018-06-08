const express = require('express');
const app = express();
const path = require('path');

const port = process.argv[2];

app.use('/',express.static('www'));

app.get('/', function(request, response)  {
    response.sendFile(path.join(__dirname, './www','index.html'));
});

app.listen(port, function(err){
    if (err) {
    return console.log(err);
}
console.log('server started on port ' + port);
});
