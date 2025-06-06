const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongodb = require('./data/database');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Headers setup
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

//setup default route
app.use("/", require("./routes"));

//Error handling middleware
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.id, `Uncaught Exceptions: ${err}\n + Exception Origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.error('❌ failed to connect to the database:', err);
    } else {
        app.listen(PORT, () => {
            console.log(`✅ Successfully connected to the database, Server is running on port ${PORT}`);
        });
    }
    });