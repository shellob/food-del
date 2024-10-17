const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Food_Del',
    password: 'Notwerk2002',
    port: 5432,
})

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error("Ошибка подключения к базе данных:", err);
    } else {
        console.log("Учпешное подключение к базе данных: ",res.rows);
    }
    pool.end();
});

async function createProduct(name, price, description) {
    const query = `
    INSERT INTO products (name, price, description)
    VALUES ( $1, $2, $3)
    RETURNING *`;

    const values = [name, price, description];

    try {
        const result = await pool.query(query, values);
        console.log('Товар Создан: ', result.rows[0]);
    } catch (err) {
        console.error('Ошибка при создании товара: ', err );
    }
}

async function getProducts() {
    const query = 'SELECT * FROM products';
    
    try {
        const result = await pool.query(query);
        console.log('Список товаров:', result.rows);
    } catch (err) {
        console.error('Ошибка при получении товаров:', err);
    }
}

async function updateProduct(id, name, price, description) {
    const query = `
        UPDATE products 
        SET name = $1, price = $2, description = $3 
        WHERE id = $4 
        RETURNING *`;
    const values = [name, price, description, id];
    
    try {
        const result = await pool.query(query, values);
        console.log('Товар обновлен:', result.rows[0]);
    } catch (err) {
        console.error('Ошибка при обновлении товара:', err);
    }
}

async function deleteProduct(id) {
    const query = `
        DELETE FROM products 
        WHERE id = $1 
        RETURNING *`;
    const values = [id];
    
    try {
        const result = await pool.query(query, values);
        console.log('Товар удален:', result.rows[0]);
    } catch (err) {
        console.error('Ошибка при удалении товара:', err);
    }
}

module.exports = pool;