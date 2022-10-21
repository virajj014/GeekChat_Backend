const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
require('./db');
require('./models/User');
const authRoutes = require('./routes/authRoutes');
const uploadMediaRoutes = require('./routes/uploadMediaRoutes');
//requireToken skipped

app.use(bodyParser.json());
app.use(authRoutes);
app.use(uploadMediaRoutes);

app.get('/', (req, res) => {
    res.send("Hello World");
})


app.listen(port, () => {
    console.log("Server is running on port " + port);
})