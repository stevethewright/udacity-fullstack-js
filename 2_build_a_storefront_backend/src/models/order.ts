import Client from '../database';

export type Order = {
    id: number;
    status: string;
    user_id: number | string;
}

export type OrderProduct = {
    id: number;
    quantity: number;
    order_id: number | string;
    product_id: number | string;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }

    async show(id: number): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot find order ${id}. Error: ${err}`);
        }
    }

    async create(status: string, user_id: number): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [status, user_id]);
            conn.release();
            const order = result.rows[0];
            return order;
        } catch (err) {
            throw new Error(`Cannot add new order for user ${user_id}. Error: ${err}`);
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            const product = result.rows[0];
            return product;
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error ${err}`);
        }
    }

    async addProduct(quantity: number, order_id: number, product_id: number): Promise<OrderProduct> {
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const conn = await Client.connect();
            const result = await conn.query(sql, [quantity, order_id, product_id]);
            conn.release();
            const order = result.rows[0];
            return order;
          } catch (err) {
            throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`);
          }
    }
}
