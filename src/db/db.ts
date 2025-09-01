import mysql from 'mysql2/promise';

let connection : mysql.Connection | null = null;

export async function getConnection() {
    try{
        if(!connection){
            connection = await mysql.createConnection({
                host: process.env.DB_HOST || 'Personal',
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASS || ' ',
                database: process.env.DB_NAME || 'assignment',
                port: Number(process.env.DB_PORT) || 3306
            });
        }
        return connection;
    } catch (error) {
        console.error('Error getting database connection:', error);
        throw new Error('Database connection error');
    }
}

export async function query<T = unknown>(sql: string, params: unknown[] = []) : Promise<T[]> {
    try {
        const conn = await getConnection();
        const [rows] = await conn.execute(sql, params);
        return rows as T[];
    } catch (error) {
        console.error('Error executing query:', error);
        throw new Error('Database query error');
    }
}