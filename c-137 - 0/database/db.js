const mysql = require('mysql2')

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password',
    database: 'crud_nodejs'
})
conexion.connect((error) => {
    if(error){
        console.error('error de conexion mysql:' + error)
        return
    }
    console.log('se conecto a la base de datos mysql')
})

module.exports = conexion

