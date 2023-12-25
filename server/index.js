const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const parseJSXContent = require('/_parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())


app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/parse', bodyParser.text(), (req, res) => {
    try {
        const { nodes, edges } = parseJSXContent(req.body.fileContent, req.body.fileName, req.body.fileID);
        res.send({ nodes, edges });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
const port = process.env.PORT || 5000;
app.listen(port,()=> console.log(`listening to ${port}`))
