const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/demo-editor'));

app.listen(process.env.APP_PORT || 8080);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/demo-editor/index.html'));
});

console.log(`Yay!! app is running like a cream.`);
