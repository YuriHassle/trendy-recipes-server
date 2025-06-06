import { createServer } from '../../src/app';
import { closeDBConnection } from '../../src/database/config';

const baseUrl = '/api/v1/users';
const server = createServer();

beforeAll(async () => {
  await server.ready();
});

afterAll(() => {
  server.close();
  closeDBConnection();
});

describe('testing users endpoint', () => {
  const userId = 2;

  test('should create a user', async () => {
    const { statusCode, body } = await server.inject({
      method: 'POST',
      url: baseUrl,
      payload: {
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123456',
        language_id: 1,
        active: true,
      },
    });

    const parsedBody = JSON.parse(body);

    expect(statusCode).toEqual(201);
    expect(parsedBody).toEqual({
      id: userId,
      name: 'John Doe',
      email: 'johndoe@email.com',
      language_id: 1,
      active: true,
      points: 0,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });
  });

  test('should not create a user with invalid data', async () => {
    const { statusCode, body } = await server.inject({
      method: 'POST',
      url: baseUrl,
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
    const { statusCode, body } = await server.inject({
      method: 'GET',
      url: `${baseUrl}/${userId}`,
    });
    const parsedBody = JSON.parse(body);

    expect(statusCode).toEqual(200);
    expect(parsedBody).toHaveProperty('name', 'John Doe');
    expect(parsedBody).not.toHaveProperty('password');
  });

  test('should not retrieve a user that does not exist', async () => {
    const { statusCode, body } = await server.inject({
      method: 'GET',
      url: `${baseUrl}/0`,
    });

    const parsedBody = JSON.parse(body);
    expect(statusCode).toEqual(404);
    expect(parsedBody).toHaveProperty('message', 'User with id 0 was not found.');
  });

  test('should retrieve all users', async () => {
    const { statusCode, body } = await server.inject({
      method: 'GET',
      url: `${baseUrl}`,
      query: {
        order: 'id',
        orderDirection: 'asc',
      },
    });
    const parsedBody = JSON.parse(body);

    expect(statusCode).toEqual(200);
    expect(parsedBody).toHaveLength(2);
    expect(parsedBody[1]).toHaveProperty('id', 2);
  });

  test('should update a user', async () => {
    const { statusCode, body } = await server.inject({
      method: 'PUT',
      url: `${baseUrl}/${userId}`,
      payload: {
        name: 'John Doe Updated',
      },
    });

    const parsedBody = JSON.parse(body);
    expect(statusCode).toEqual(200);
    expect(parsedBody).toHaveProperty('name', 'John Doe Updated');
  });

  test('should delete a user', async () => {
    const { statusCode, body } = await server.inject({
      method: 'DELETE',
      url: `${baseUrl}/${userId}`,
    });

    const parsedBody = JSON.parse(body);
    expect(statusCode).toEqual(200);
    expect(parsedBody).toHaveProperty(
      'message',
      `User with id ${userId} was successfully deleted.`,
    );
  });
});
