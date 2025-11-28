import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'bdgestion.db');

// VERIFICA que la base de datos existe
console.log('Database path:', dbPath);

async function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
        
        db.all(sql, params, (err, rows) => {
            if (err) {
                console.error('SQLite query error:', err);
                reject(err);
            } else {
                console.log('SQLite query result:', rows);
                resolve(rows);
            }
            db.close();
        });
    });
}

async function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
        
        db.run(sql, params, function(err) {
            if (err) {
                console.error('SQLite run error:', err);
                reject(err);
            } else {
                console.log('SQLite run result:', this);
                resolve({ 
                    affectedRows: this.changes,
                    insertId: this.lastID 
                });
            }
            db.close();
        });
    });
}

export default {
    query,
    run
};