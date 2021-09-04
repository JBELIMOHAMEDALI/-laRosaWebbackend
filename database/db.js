const mysql = require('mysql');
const connection = mysql.createConnection({
    host : process.env.host,
    user : process.env.user,
    password : process.env.password,
    database : process.env.database
});
connection.connect((error)=>{
    if(error){
        console.log('\x1b[33m','DATABASE CONNECTION ERROR');
    }else{
        console.log('\x1b[34m','CONNECTED SUCCESSFULLY');
    }
});


module.exports = connection;