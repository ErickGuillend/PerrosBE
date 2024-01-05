import express  from "express";
import dbConnection from "./database.js";


const port = 3005;
const app = express();

app.use(express.json());

app.get('/perros', async (req, res) =>{
    let showP = 'SELECT * FROM perros';
    let consulta = await dbConnection.execute(showP);
    if (consulta.length) {
        res.status(200).json(consulta);
    } else {
        res.status(500).json({message: 'no se pudieron econtrar registros'});
    }
    
});

app.post("/perros", async (req, res) =>{
    let age = req.body.age;
    let name = req.body.name;
    if (Number.isInteger(age) && name.trim().length && typeof name === 'string') {
        let query = 'INSERT INTO perros (name, age) VALUES (?,?)';
        let [rows] = await dbConnection.execute(query, [name, age]);
        if (rows.affectedRows) {
            return res.status(201).json({message:'Perro insertado satisfactoriamente', id:rows.insertId});
        } else {
            return res.status(500).json({message:'No se pudo insertar el perro'});
        }
     } else {  
        res.status(500).json({message: 'Algún dato no es valido'});  
     }
});

app.delete('/perros', async (req, res) =>{
    console.log(req.query.name);
    let name = req.query.name;
    let query = `DELETE FROM perros WHERE name = '${name}'`;
    let sql = await dbConnection.execute(query);
    console.log(sql);
    if (sql[0].affectedRows) {
        res.status(201).json({message: `El perro ${name} ha sido eliminado`});
    } else {
        res.status(500).json({message: `El perro: ${name} no se ha eliminado, ya que no existe`});
    }
    
});

/*
 hacer put para modificar valores en la bd
*/
app.put('/perros/:id', async (req, res) =>{
    let perroId = req.params.id;
    let name = req.body.name;

    
   let [query] = await dbConnection.execute(`UPDATE perros SET name = ? WHERE id = ?`, [name, perroId]);
    if (query.affectedRows) {
        res.json({message: 'Nombre de perro actualizado correctamente!!!'});
    } else {
        res.status(400).json({messgae: 'No se encontró el perro para actualizar'});
    }
});

app.listen(port, ()=>{
    console.log(`Server running on Port ${port}`);
});
