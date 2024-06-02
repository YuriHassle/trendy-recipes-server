import buildFastify, { destroyFastify } from '../../src/app';
import type { FastifyInstance } from 'fastify';

let fastify: FastifyInstance;

beforeAll(async () => {
  fastify = buildFastify();
  await fastify.ready();
});

afterAll(() => {
  destroyFastify();
});

describe('testing user endpoint', () => {
  let userId: number;

  test('should create a user', async () => {
    const { statusCode, body } = await fastify.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123456',
        language_id: 1,
        active: true,
      },
    });

    const parsedBody = JSON.parse(body);
    userId = parsedBody.id;

    expect(statusCode).toEqual(201);
    expect(parsedBody).toHaveProperty('name');
    expect(parsedBody).not.toHaveProperty('password');
  });

  test('should not create a user with invalid data', async () => {
    const { statusCode, body } = await fastify.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name: 'John Doe',
        email: 'johndoe',
        password: 123456,
        active: true,
      },
    });

    const { message: errorMessage } = JSON.parse(body);
    expect(statusCode).toEqual(400);
    expect(errorMessage).toContain("body must have required property 'language_id'");
    expect(errorMessage).toContain('email is invalid');
    expect(errorMessage).toContain('password must be string');
  });

  test('should retrieve one user', async () => {
    const { statusCode, body } = await fastify.inject({
      method: 'GET',
      url: `/users/${userId}`,
    });
    const parsedBody = JSON.parse(body);

    expect(statusCode).toEqual(200);
    expect(parsedBody).toHaveProperty('name', 'John Doe');
    expect(parsedBody).not.toHaveProperty('password');
  });

  test('should not retrieve a user that does not exist', async () => {
    const { statusCode, body } = await fastify.inject({
      method: 'GET',
      url: '/users/0',
    });

    const parsedBody = JSON.parse(body);
    expect(statusCode).toEqual(404);
    expect(parsedBody).toHaveProperty('message', 'User with id 0 was not found.');
  });

  test('should retrieve all users', async () => {
    const { statusCode, body } = await fastify.inject({
      method: 'GET',
      url: '/users?limit=1',
    });
    const parsedBody = JSON.parse(body);

    expect(statusCode).toEqual(200);
    expect(parsedBody).toHaveLength(1);
    expect(parsedBody[0]).toHaveProperty('id');
  });

  test('should update a user', async () => {
    const { statusCode, body } = await fastify.inject({
      method: 'PUT',
      url: `/users/${userId}`,
      payload: {
        name: 'John Doe Updated',
      },
    });

    const parsedBody = JSON.parse(body);
    expect(statusCode).toEqual(200);
    expect(parsedBody).toHaveProperty('name', 'John Doe Updated');
  });

  test('should delete a user', async () => {
    const { statusCode, body } = await fastify.inject({
      method: 'DELETE',
      url: `/users/${userId}`,
    });

    const parsedBody = JSON.parse(body);
    expect(statusCode).toEqual(200);
    expect(parsedBody).toHaveProperty(
      'message',
      `User with id ${userId} was successfully deleted.`,
    );
  });
});
