const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const { userSchema, loginSchema } = require('./backend_validation.js');
const PORT = 9000;
const app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.post('/auth_register', (req, res) => {
    
    const result = userSchema.validate(req.body);

    if(result.error){
        res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
    } else {
        const obj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_date: req.body.birth_date,
            country_of_residence: req.body.country_of_residence,
            elo_rating: req.body.elo_rating,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            admin: req.body.admin,
            moderator: req.body.moderator,
            player: req.body.player
        };

        Users.create(obj).then( rows => {
        
            const usr = {
                userId: rows.id,
                user: rows.username
            };
    
            const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
            res.json({ token: token });
    
        }).catch( err => res.status(500).json( {msg: "Uneseni parametri nisu validni."} ) );
    }   
});

app.post('/auth_login', (req, res ) => {

    const result = loginSchema.validate(req.body);

    if(result.error){
        res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
    } else {
        Users.findOne({ where: { username: req.body.username } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.username
                };

                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                res.json({ token: token, userId: usr.id});
                
            } else {
                res.status(400).json({ msg: "Uneseni kredencijali nisu validni."});
            }
        })
        .catch( err => res.status(500).json( {msg: "Uneseni kredencijali nisu validni."}) );
    }
});

sequelize.authenticate()
    .then(() => console.log('Konektovani ste na bazu.'))
    .catch(err => console.log('Greska: ' + err));

app.listen(PORT, () => {
    console.log(`Autentifikacioni servis je pokrenut: http://127.0.0.1:${PORT}`)
});