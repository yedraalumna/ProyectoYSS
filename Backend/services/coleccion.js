import db from './db.js';
import helper from '../helper.js';

//Función para insertar datos - CORREGIDA para SQLite
async function insertData(req, res) {
  const data = req.query;
  
  try {
    const result = await db.run(
      `INSERT INTO coleccion (nombre, marca, tipo, precio) 
       VALUES (?, ?, ?, ?)`,
      [data.nombre, data.marca, data.tipo, data.precio]
    );
    
    // CORRECCIÓN: SQLite devuelve el resultado diferente
    // Devuelve solo el número de filas afectadas como tu amiga
    let affectedRows = 0;
    if (result && result.affectedRows) {
      affectedRows = result.affectedRows;
    }
    
    console.log('Insert result:', result, 'Affected rows:', affectedRows);
    return affectedRows;
    
  } catch (error) {
    console.error('Error en insertData:', error);
    return 0;
  }
}

//Función para obtener datos - CORREGIDA para SQLite
async function getData(req, res) {
  try {
    const rows = await db.query(`
      SELECT id, nombre, marca, tipo, precio 
      FROM coleccion 
      ORDER BY id DESC
    `);
    
    console.log('Rows from SQLite:', rows);
    
    const data = helper.emptyOrRows(rows);
    
    return {
      data
    };
  } catch (error) {
    console.error('Error en getData:', error);
    return {
      data: []
    };
  }
}

//Función para borrar datos - CORREGIDA para SQLite
async function deleteData(req, res) {
  const data = req.query;
  
  try {
    const result = await db.run(
      `DELETE FROM coleccion WHERE id = ?`,
      [data.id]
    );
    
    //SQLite devuelve el resultado diferente
    let affectedRows = 0;
    if (result && result.affectedRows) {
      affectedRows = result.affectedRows;
    }
    
    console.log('Delete result:', result, 'Affected rows:', affectedRows);
    return affectedRows;
    
  } catch (error) {
    console.error('Error en deleteData:', error);
    return 0;
  }
}

export default {
  getData,
  insertData,
  deleteData
};