const express = require('express')
const router = express.Router()
// invoca a la base de datos mysql
const conexion = require('../database/db')

//invoca el metodo CRUD de usuarios
const userControllers = require('../controllers/userControllers')
const authControllers = require('../controllers/authControllers')

const { Router } = require('express')
const { json } = require('express')

//es la raiz
router.get('/users', authControllers.isAuthenticate,(req, res)=> {
    
    //res.send('io')

    // comando basico para validar la conexcion 

    // conexion.query('select * from user', (error, results) => {
    //     if(error){
    //         throw error;
    //     } else {
    //         res.send(results);
    //     }
    // })

    conexion.query('select * from user', (error, results) => {
        if(error){
        throw error;
        } else {
            if(req.user.rol=="Admin") {
                //res.send(results);
                res.render('users', {results : results})
            } else {
                res.render('index', { userName: req.user.email, titleweb: "Inicio" });
            }              
        }
    })    
});

// para direccionar a create.ejs
router.get('/createUser', authControllers.isAuthenticate,(req, res) => {
    if(req.user.rol=="Admin") {
        res.render('createUser')
    } else {
        res.render('index', { userName: req.user.email, titleweb: "Inicio" });
    }       
});

// para direccionar a edit.ejs
router.get('/editUser/:id', authControllers.isAuthenticate,(req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM user WHERE id = ?', [id], (error, results) => {
        if(error){
        throw error;
        } else {    
            if(req.user.rol=="Admin") {
                res.render('editUser', {user : results [0]})
            } else {
                res.render('index', { userName: req.user.email, titleweb: "Inicio" });
            }            
        }
    })
});    



router.post('/saveUser', userControllers.saveUser);  
router.post('/updateUser', userControllers.updateUser); 

//para el delete
router.get('/deleteUser/:id', (req, res) => {
    const id = req.params.id
    conexion.query('DELETE FROM user WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
            } else {            
                res.redirect('/users')
            }
    })
});

// // router for views
// router.get('/', authControllers.isAuthenticate, (req, res) => {
//     res.render('index', {userName: row.name, titleweb: "Control"})
// }); 

// router for views
router.get('/', authControllers.isAuthenticate, (req, res) => {
    // Asegúrate de que `req.user` existe antes de intentar acceder a sus propiedades
    if (req.user) {
        res.render('index', { userName: req.user.email, titleweb: "Inicio" });
    } else {
        // Si por alguna razón no existe el usuario, redirigir a la página de login o manejar el error
        res.redirect('/login');
    }
});


router.get('/logout', authControllers.logout);

// direcciona a login
router.get('/login', (req, res) => {
    res.render('login', { alert:false })
});

// direcciona a register
router.get('/register', (req, res) => {
    res.render('register', { alert:false })
});

router.post('/register', authControllers.register);
router.post('/login', authControllers.login);

module.exports = router;