
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.js');

const signup = (req, res, next) => {
    // checks if email already exists
    User.findOne({ where : {
        email: req.body.email, 
    }})
    .then(dbUser => {
        if (dbUser) {
            return res.status(409).json({message: "El email ya esta registrado"});
        } else if (req.body.email && req.body.password && req.body.name) {
            // password hash
            bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "No se pudo encriptar tu contraseña"}); 
                } else if (passwordHash) {
                    return User.create(({
                        email: req.body.email,
                        name: req.body.name,
                        password: passwordHash,
                    }))
                    .then(() => {
                        res.status(200).json({message: "Usuario creado"});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({message: "Error mientras se intenta crear el usuario"});
                    });
                };
            });
        } else if (!req.body.password) {
            return res.status(400).json({message: "Contraseña requerida"});
        }else if (!req.body.name) {
            return res.status(400).json({message: "Nombre requerido"});
        }else if (!req.body.email) {
            return res.status(400).json({message: "Email requerido"});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const login = (req, res, next) => {
    console.log(res.body);
    User.findOne({ where : {
        email: req.body.email, 
    }}).then(dbUser => {
        if (!dbUser) {
            return res.status(404).json({message: "Usuario no encontado"});
        } else {
            // password hash
            bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
                if (err) { // error while comparing
                    res.status(502).json({message: "error while checking user password"});
                } else if (compareRes) { // password match
                    const token = jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });
                    res.status(200).json({message: "user logged in", "token": token});
                } else { // password doesnt match
                    res.status(401).json({message: "invalid credentials"});
                };
            });
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: 'not authenticated' });
    };
    const token = authHeader.split(' ')[1];
    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({ message: err.message || 'could not decode the token' });
    };
    if (!decodedToken) {
        res.status(401).json({ message: 'unauthorized' });
    } else {
        res.status(200).json({ message: 'here is your resource' });
    };
};

exports.signup = signup;
exports.login = login;
exports.isAuth = isAuth;