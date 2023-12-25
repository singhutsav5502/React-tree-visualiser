const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const parseJSXContent = require('./scripts/parser.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/parse', bodyParser.text(), (req, res) => {
    const { nodes, edges } = parseJSXContent(req.body.fileContent , req.body.fileName , req.body.fileID);
    res.send({ nodes, edges });
})
// app.listen(process.env.PORT, () => {
//     console.log(`listening to port: ${process.env.PORT}`)
// });