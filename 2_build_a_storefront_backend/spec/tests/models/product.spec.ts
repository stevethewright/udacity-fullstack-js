import { Product, ProductStore } from '../../../src/models/product';

const store = new ProductStore();

beforeAll(async (): Promise<void> => {
  await store.create('Before_Product', 102.12);
  await store.create('Delete_This', 9999.99);
});

describe('Product model', () => {
  
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

  it('should create a new product in the database', async () => {
    const result: Product = await store.create('Product 1', 50.99);
    expect(result).toEqual({
      id: 4,
      name: 'Product 1',
      price: '50.99'
    });
  });

  it('should return all products in the database', async () => {
    const result: Product[] = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should show a specific product in the database', async () => {
    const result: Product = await store.show(2);
    expect(result).toEqual({
      id: 2,
      name: 'Before_Product',
      price: '102.12'
    });
  });

  it('should delete a specific product in the database', async () => {
    const beforeLen: number = (await store.index()).length;
    await store.delete(3);
    const afterLen: number = (await store.index()).length;
    expect(afterLen).toEqual((beforeLen - 1));
  });

});
