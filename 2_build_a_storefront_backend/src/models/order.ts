import Client from '../database';

export type Order = {
    id?: number;
    status: string;
    user_id: number | string;
}

export type OrderProduct = {
    id?: number;
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

    async create(o: Order): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [o.status, o.user_id]);
            conn.release();
            const order = result.rows[0];
            return order;
        } catch (err) {
            throw new Error(`Cannot add new order for user ${o.user_id}. Error: ${err}`);
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            const order = result.rows[0];
            return order;
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error ${err}`);
        }
    }

    async getOrderProducts(id: number): Promise<OrderProduct[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM order_products WHERE order_id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot find order ${id}. Error: ${err}`);
        }
    }

    async addOrderProduct(op: OrderProduct): Promise<OrderProduct> {
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const conn = await Client.connect();
            const result = await conn.query(sql, [op.quantity, op.order_id, op.product_id]);
            conn.release();
            const order = result.rows[0];
            return order;
          } catch (err) {
            throw new Error(`Could not add product ${op.product_id} to order ${op.order_id}: ${err}`);
          }
    }

    async deleteOrderProduct(id: number): Promise<OrderProduct> {
        try {
            const sql = 'DELETE FROM order_products WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            const orderProduct = result.rows[0];
            return orderProduct;
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error ${err}`);
        }
    }

    async updateOrderProductQuantity(id: number, quantity: number): Promise<OrderProduct> {
        try {
            const sql = 'UPDATE order_products SET quantity=($1) WHERE id=($2)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [quantity, id]);
            conn.release();
            const orderProduct = result.rows[0];
            return orderProduct;
        } catch (err) {
            throw new Error(`Could not update order ${id}. Error ${err}`);
        }
    }
}
