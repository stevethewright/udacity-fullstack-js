import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    password_digest: string;
}

dotenv.config();

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS
} = process.env;

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get users. Error ${err}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot find user ${id}. Error: ${err}`);
        }
    }

    async create(u: User): Promise<User> {
        const pepper = BCRYPT_PASSWORD;
        const saltRounds = SALT_ROUNDS;
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (first_name, last_name, password_digest) VALUES($1, $2, $3) RETURNING *';
            const hash = bcrypt.hashSync(
                u.password_digest + pepper,
                parseInt(saltRounds!)
            );
            const result = await conn.query(sql, [u.first_name, u.last_name, hash]);
            conn.release();
            const product = result.rows[0];
            return product;
        } catch (err) {
            throw new Error(`Cannot add new user ${u.first_name + u.last_name}. Error: ${err}`);
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            const product = result.rows[0];
            return product;
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error ${err}`);
        }
    }
}