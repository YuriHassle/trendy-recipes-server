import { createServer } from '../../src/app';
import { closeDBConnection } from '../../src/database/config';

const baseUrl = '/api/v1/recipes';
const server = createServer();

beforeAll(async () => {
  await server.ready();
});

afterAll(() => {
  server.close();
  closeDBConnection();
});

describe('testing recipes endpoint', () => {
  const recipeId = 2;

  test('should create a recipe passing video_id on property on payload', async () => {
    const { statusCode, body } = await server.inject({
      method: 'POST',
      url: baseUrl,
      payload: {
        title: 'Recipe title',
        description: 'Recipe description',
        ingredients: 'ingredient 1, ingredient 2',
        preparation: 'Step 1, step 2...',
        user_id: 1,
        language_id: 1,
        video_id: 1,
      },
    });

    const parsedBody = JSON.parse(body);

    expect(statusCode).toEqual(201);
    expect(parsedBody).toEqual({
      id: recipeId,
      title: 'Recipe title',
      description: 'Recipe description',
      ingredients: 'ingredient 1, ingredient 2',
      preparation: 'Step 1, step 2...',
      user_id: 1,
      language_id: 1,
      video_id: 1,
      active: true,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });
  });

  test('should create a recipe passing video object on payload', async () => {
    const { statusCode, body } = await server.inject({
      method: 'POST',
      url: baseUrl,
      payload: {
        title: 'Recipe title',
        description: 'Recipe description',
        ingredients: 'ingredient 1, ingredient 2',
        preparation: 'Step 1, step 2...',
        user_id: 1,
        language_id: 1,
        video_id: 0, // should be ignored
        video: {
          url: 'https://www.tiktok.com/@user/video/456',
          source: 'tiktok',
        },
      },
    });

    const parsedBody = JSON.parse(body);

    expect(statusCode).toEqual(201);
    expect(parsedBody).toEqual({
      id: 3,
      title: 'Recipe title',
      description: 'Recipe description',
      ingredients: 'ingredient 1, ingredient 2',
      preparation: 'Step 1, step 2...',
      user_id: 1,
      language_id: 1,
      video_id: 2,
      active: true,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });
  });

  test('should create a recipe with a existing video if the recipe language is different', async () => {
    const { statusCode, body } = await server.inject({
      method: 'POST',
      url: baseUrl,
      payload: {
        title: 'Recipe title',
        description: 'Recipe description',
        ingredients: 'ingredient 1, ingredient 2',
        preparation: 'Step 1, step 2...',
        user_id: 1,
        language_id: 2,
        video: {
          url: 'https://www.tiktok.com/@user/video/456',
          source: 'tiktok',
        },
      },
    });

    const parsedBody = JSON.parse(body);

    expect(statusCode).toEqual(201);
    expect(parsedBody).toEqual({
      id: 4,
      title: 'Recipe title',
      description: 'Recipe description',
      ingredients: 'ingredient 1, ingredient 2',
      preparation: 'Step 1, step 2...',
      user_id: 1,
      language_id: 2,
      video_id: 2,
      active: true,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });
  });

  test('should not create a recipe with a existing video if the recipe language already exists', async () => {
    const { statusCode, body } = await server.inject({
      method: 'POST',
      url: baseUrl,
      payload: {
        title: 'Recipe title',
        description: 'Recipe description',
        ingredients: 'ingredient 1, ingredient 2',
        preparation: 'Step 1, step 2...',
        user_id: 1,
        language_id: 1,
        video: {
          url: 'https://www.tiktok.com/@user/video/456',
          source: 'tiktok',
        },
      },
    });

    const { message } = JSON.parse(body);

    expect(statusCode).toEqual(400);
    expect(message).toContain('Recipe with the same video and language already exists');
  });

  test('should not create a recipe with invalid data', async () => {
    const { statusCode, body } = await server.inject({
      method: 'POST',
      url: baseUrl,
      payload: {
        title: 'Recipe title',
        description: 'Recipe description',
        ingredients: 'ingredient 1, ingredient 2',
        preparation: 'Step 1, step 2...',
        language_id: 1,
      },
    });

    const { message } = JSON.parse(body);
    expect(statusCode).toEqual(400);
    expect(message).toContain("body must have required property 'user_id'");
  });

  test('should retrieve one recipe', async () => {});

  test('should not retrieve a recipe that does not exist', async () => {});

  test('should retrieve all recipes', async () => {});

  test('should update a recipe', async () => {});

  test('should delete a recipe', async () => {});
});
