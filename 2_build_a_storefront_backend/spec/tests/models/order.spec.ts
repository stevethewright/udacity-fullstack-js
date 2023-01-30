import 'jasmine';

import { Order, OrderProduct, OrderStore } from '../../../src/models/order';
import { Product, ProductStore } from '../../../src/models/product';
import { User, UserStore } from '../../../src/models/user';

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

beforeAll(async (): Promise<void> => {
    let user1: User = {
      first_name: 'Bob', 
      last_name: 'Jones', 
      password_digest: 'exampleBob'
    }
    let user2: User = {
      first_name: 'Jimmy',
      last_name: 'Jones',
      password_digest: 'exampleJames'
    }
    let product1: Product = {
      name: 'A Good Product', 
      price: '2.25'
    }
    let product2: Product = {
      name: 'An even better Product', 
      price: '1000'
    }
    let order1: Order = {
      status: 'active',
      user_id: 1
    }
    let order2: Order = {
      status: 'complete',
      user_id: 2
    }
    let order3: Order = {
      status: 'active',
      user_id: 1
    }
    let order4: Order = {
      status: 'active',
      user_id: 1
    }
    let order5: Order = {
      status: 'active',
      user_id: 1
    }
    let order6: Order = {
      status: 'active',
      user_id: 1
    }
    let orderProduct1: OrderProduct = {
      quantity: 100,
      order_id: 3,
      product_id: 1
    }
    let orderProduct2: OrderProduct = {
      quantity: 867,
      order_id: 3,
      product_id: 2
    }
    let orderProduct3: OrderProduct = {
      quantity: 90,
      order_id: 4,
      product_id: 2
    }
    let orderProduct4: OrderProduct = {
      quantity: 22,
      order_id: 5,
      product_id: 2
    }
    let orderProduct5: OrderProduct = {
      quantity: 22,
      order_id: 6,
      product_id: 2
    }
    let orderProduct6: OrderProduct = {
      quantity: 12,
      order_id: 6,
      product_id: 1
    }
    await userStore.create(user1);
    await userStore.create(user2);
    await productStore.create(product1);
    await productStore.create(product2);
    await store.create(order1);
    await store.create(order2);
    await store.create(order3);
    await store.create(order4);
    await store.create(order5);
    await store.create(order6);
    await store.addOrderProduct(orderProduct1);
    await store.addOrderProduct(orderProduct2);
    await store.addOrderProduct(orderProduct3);
    await store.addOrderProduct(orderProduct4);
    await store.addOrderProduct(orderProduct5);
    await store.addOrderProduct(orderProduct6);
});

describe('Order model', () => {
  
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('should create a new order in the database', async () => {
    const newOrder: Order = {
      status: 'active',
      user_id: 1
    }
    const result: Order = await store.create(newOrder);
    expect(result).toEqual({
      id: 9,
      status: 'active',
      user_id: '1'
    });
  });

  it('should return all orders in the database', async () => {
    const result: Order[] = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should show an order in the database', async () => {
    const result: Order = await store.show(1);
    expect(result).toEqual({
      id: 1,
      status: 'active',
      user_id: '1'
    });
  });

  it('should delete an order in the database', async () => {
    const beforeLen: number = (await store.index()).length;
    await store.delete(2);
    const afterLen: number = (await store.index()).length;
    expect(afterLen).toEqual((beforeLen - 1));
  });

  it('should add a product to an order', async () => {
    const newOrderProduct: OrderProduct = {
      quantity: 2,
      order_id: 1,
      product_id: 1
    }
    const result: OrderProduct = await store.addOrderProduct(newOrderProduct);
    expect(result).toEqual({
        id: 8,
        quantity: 2,
        order_id: '1',
        product_id: '1'
    });
  });

  it('should show the products in an order in the database', async () => {
    const result: OrderProduct[] = await store.getOrderProducts(3);
    expect(result[0]).toEqual({
      id: 1,
      quantity: 100,
      order_id: '3',
      product_id: '1'
    });
    expect(result[1]).toEqual({
      id: 2,
      quantity: 867,
      order_id: '3',
      product_id: '2'
    });
  });

  it('should delete a product in an order in the database', async () => {
    const beforeLen: number = (await store.getOrderProducts(6)).length;
    await store.deleteOrderProduct(6);
    const afterLen: number  = (await store.getOrderProducts(6)).length;
    expect(afterLen).toEqual((beforeLen - 1));
  });

  it('should update a product quantity in an order in the database', async () => {
    const before: OrderProduct[] = await store.getOrderProducts(6);
    expect(before[0].quantity).toEqual(22);
    await store.updateOrderProductQuantity(5, 1);
    const after: OrderProduct[] = await store.getOrderProducts(6);
    after.forEach(orderProduct => {
      if (orderProduct.id === 5) {
        expect(orderProduct.quantity).toEqual(1);
      }
    });
  });

  

});
