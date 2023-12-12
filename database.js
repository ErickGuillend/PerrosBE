import mysql from 'mysql2/promise';

//Create a new MYSQL CONNECTION

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'penta',
    database: 'dogs'
});


//Conect to the MySQL database

connection.connect((error) =>{
    if(error){
        console.log('Error connecting to MySQL database', error);
    } else {
        console.log('Connected to MySQL database!!!');
    }
});



//Close the MySQL connection
//connection.end();

export default connection;