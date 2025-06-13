// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');

// const mongodb = require('./data/database');
// const passport = require('passport');
// const session = require('express-session');
// const githubStrategy = require('passport-github2').Strategy;
// const cors = require('cors');

// const PORT = process.env.PORT || 3000;

// app
//     .use(bodyParser.json())
//     .use(session({
//         secret: 'your_secret_key',
//         resave: false,
//         saveUninitialized: true,}))
//     .use(passport.initialize())
//     .use(passport.session())
//     // Headers setup
//     .use((req, res, next) => {
//         res.setHeader("Access-Control-Allow-Origin", "*");
//         res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
//         res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//         next();
//     })
//     .use(cors({ methods: "GET, POST, PUT, DELETE, OPTIONS", origin: "*" }))
//     // Passport GitHub Strategy

//     //setup default route
//     .use("/", require("./routes"));

//     passport.use(new githubStrategy({
//         clientID: process.env.GITHUB_CLIENT_ID,
//         clientSecret: process.env.GITHUB_CLIENT_SECRET,
//         callbackURL: process.env.GITHUB_CALLBACK_URL
//     }, 
//     function(accessToken, refreshToken, profile, done) {
//         // Here you can save the user profile to your database
//         return done(null, profile);
//     }
// ));

// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

// app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : 'Logged Out'); });

// app.get('/auth/github/callback', passport.authenticate('github', {
//     failureRedirect: '/api-docs', session: false}), 
//     (req, res) => {
//     // Successful authentication, redirect home.
//     req.session.user = req.user;
//     res.redirect('/');
// });     

// //Error handling middleware
// process.on('uncaughtException', (err, origin) => {
//     console.log(process.stderr.id, `Uncaught Exceptions: ${err}\n + Exception Origin: ${origin}`);
// });

// mongodb.initDb((err) => {
//     if (err) {
//         console.error('❌ failed to connect to the database:', err);
//     } else {
//         app.listen(PORT, () => {
//             console.log(`✅ Successfully connected to the database, Server is running on port ${PORT}`);
//         });
//     }
//     });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongodb = require('./data/database');
const mongoose = require('mongoose'); // Required for connect-mongo to work
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const githubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI, // Update with your actual DB URI
            ttl: 14 * 24 * 60 * 60 // = 14 days session lifetime
        })
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        next();
    })
    .use(cors({ methods: "GET, POST, PUT, DELETE, OPTIONS", origin: "*" }))
    .use("/", require("./routes"));

passport.use(new githubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
}, 
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : 'Logged Out');
});

app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

// Error handling middleware
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.id, `Uncaught Exceptions: ${err}\n + Exception Origin: ${origin}`);
});

// Start server after DB init
mongodb.initDb((err) => {
    if (err) {
        console.error('❌ failed to connect to the database:', err);
    } else {
        app.listen(PORT, () => {
            console.log(`✅ Successfully connected to the database, Server is running on port ${PORT}`);
        });
    }
});
