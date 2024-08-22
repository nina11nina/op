// invoca a la base de datos mysql
const conexion = require('../database/db')
// procesure para guardar
exports.saveUser = (req,res) => {
    const email = req.body.email
    const name = req.body.name
    const rol= req.body.rol

    //tambien se puede usar asi
    //const {email, name, rol} = req.body 

    // sirve para mostrar por consola los datos ingresados en el formulario
    //console.log(email + " - " + name + " - " + rol)

    // cremos el insert
    conexion.query('INSERT INTO user SET ?', {email:email, name:name, rol:rol}, (error,results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/users');
        }
    });
};  

//procedimiento para update  
exports.updateUser = (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const email = req.body.email
    const rol = req.body.rol

    conexion.query('UPDATE user SET ? WHERE id = ?', [{ name:name, email:email, rol:rol}, id], (error,results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/users');
        }
    });
};