import 'jasmine';

import { Product, ProductStore } from '../../../src/models/product';

const store = new ProductStore();

beforeAll(async (): Promise<void> => {
  let product1: Product = {
    name: 'Before_Product', 
    price: '102.12'
  }
  let product2: Product = {
    name: 'Delete_This',
    price: '9999.99'
  }
  await store.create(product1);
  await store.create(product2);
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
    const newProduct: Product = {
      name: 'Product 1', 
      price: '50.99'
    }
    const result: Product = await store.create(newProduct);
    expect(result).toEqual({
      id: 7,
      name: 'Product 1',
      price: '50.99'
    });
  });

  it('should return all products in the database', async () => {
    const result: Product[] = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should show a specific product in the database', async () => {
    const result: Product = await store.show(3);
    expect(result).toEqual({
      id: 3,
      name: 'Before_Product',
      price: '102.12'
    });
  });

  it('should delete a specific product in the database', async () => {
    const beforeLen: number = (await store.index()).length;
    await store.delete(4);
    const afterLen: number = (await store.index()).length;
    expect(afterLen).toEqual((beforeLen - 1));
  });

});
