import { User, UserStore } from '../../../src/models/user';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

const store = new UserStore();

dotenv.config();

const {
    BCRYPT_PASSWORD
} = process.env;

beforeAll(async (): Promise<void> => {
  await store.create('Before', 'User', 'smartPassword4');
  await store.create('Delete', 'User2', '1234');
});

describe('User model', () => {
  
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

  it('should create a new user in the database', async () => {
    const result: User = await store.create('John', 'Smith', 'password123');
    expect(result.id).toEqual(5);
    expect(result.first_name).toEqual('John');
    expect(result.last_name).toEqual('Smith');
    expect(result.password_digest).not.toEqual('password123');
    const pepper = BCRYPT_PASSWORD;
    expect(bcrypt.compareSync('password123' + pepper, result.password_digest)).toBeTrue();
  });

  it('should return all users in the database', async () => {
    const result: User[] = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should show a specific user in the database', async () => {
    const result: User = await store.show(3);
    expect(result.id).toEqual(3);
    expect(result.first_name).toEqual('Before');
    expect(result.last_name).toEqual('User');
    expect(result.password_digest).not.toEqual('smartPassword4');
    const pepper = BCRYPT_PASSWORD;
    expect(bcrypt.compareSync('smartPassword4' + pepper, result.password_digest)).toBeTrue();
  });

  it('should delete a specific user in the database', async () => {
    const beforeLen: number = (await store.index()).length;
    await store.delete(4);
    const afterLen: number = (await store.index()).length;
    expect(afterLen).toEqual((beforeLen - 1));
  });

});
