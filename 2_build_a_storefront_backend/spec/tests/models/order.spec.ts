import { Order, OrderProduct, OrderStore } from '../../../src/models/order';
import { Product, ProductStore } from '../../../src/models/product';
import { User, UserStore } from '../../../src/models/user';

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

beforeAll(async (): Promise<void> => {
    await userStore.create('Bob', 'Jones', 'exampleBob');
    await userStore.create('Jimmy', 'Jones', 'exampleJames');
    await productStore.create('A Good Product', 2.25);
    await store.create('Active', 1);
    await store.create('Completed', 2);
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
    const result: Order = await store.create('Waiting Payment', 1);
    expect(result).toEqual({
      id: 3,
      status: 'Waiting Payment',
      user_id: '1'
    });
  });

  it('should return all orders in the database', async () => {
    const result: Order[] = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should show a order product in the database', async () => {
    const result: Order = await store.show(1);
    expect(result).toEqual({
      id: 1,
      status: 'Active',
      user_id: '1'
    });
  });

  it('should delete a order product in the database', async () => {
    const beforeLen: number = (await store.index()).length;
    await store.delete(2);
    const afterLen: number = (await store.index()).length;
    expect(afterLen).toEqual((beforeLen - 1));
  });

  it('should add a product to an order', async () => {
    const result: OrderProduct = await store.addProduct(2, 1, 1);
    expect(result).toEqual({
        id: 1,
        quantity: 2,
        order_id: '1',
        product_id: '1'
    });
  });

});
