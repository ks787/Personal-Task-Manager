const request = require('supertest');
const fs = require('fs');
const path = require('path');

const TEMP_FILE = path.join(__dirname, '../data/tasks.test.json');
process.env.TASKS_FILE = TEMP_FILE;

const app = require('../app');

beforeEach(() => {
  // Start every test with a clean slate
  fs.writeFileSync(TEMP_FILE, '[]', 'utf8');
});

afterAll(() => {
  // Remove the temp file once the suite finishes
  if (fs.existsSync(TEMP_FILE)) fs.unlinkSync(TEMP_FILE);
});

// Helper — creates a task and returns the parsed body
async function seedTask(overrides = {}) {
  const res = await request(app)
    .post('/api/tasks')
    .send({ title: 'Seed task', ...overrides });
  return res.body.task;
}

// 1. POST with valid body → 201 + task object returned
test('POST /api/tasks with valid body returns 201 and a task object', async () => {
  const res = await request(app)
    .post('/api/tasks')
    .send({ title: 'Buy groceries', description: 'Milk and eggs', dueDate: '2025-12-31' });

  expect(res.status).toBe(201);
  expect(res.body.task).toMatchObject({
    title: 'Buy groceries',
    description: 'Milk and eggs',
    dueDate: '2025-12-31',
    completed: false,
  });
  expect(res.body.task.id).toBeDefined();
  expect(res.body.task.createdAt).toBeDefined();
});

// 2. POST with missing title → 400 + error field present
test('POST /api/tasks with missing title returns 400 and error field', async () => {
  const res = await request(app).post('/api/tasks').send({ description: 'No title here' });

  expect(res.status).toBe(400);
  expect(res.body.error).toBeDefined();
});

// 3. GET /api/tasks → 200 + tasks array returned
test('GET /api/tasks returns 200 and a tasks array', async () => {
  const res = await request(app).get('/api/tasks');

  expect(res.status).toBe(200);
  expect(Array.isArray(res.body.tasks)).toBe(true);
});

// 4. GET /api/tasks returns tasks sorted newest first
test('GET /api/tasks returns tasks sorted newest first', async () => {
  await seedTask({ title: 'First task' });
  await new Promise((r) => setTimeout(r, 10));
  await seedTask({ title: 'Second task' });

  const res = await request(app).get('/api/tasks');

  expect(res.status).toBe(200);
  expect(res.body.tasks[0].title).toBe('Second task');
  expect(res.body.tasks[1].title).toBe('First task');
});

// 5. PUT /:id with valid body → 200 + updated task returned
test('PUT /api/tasks/:id with valid body returns 200 and updated task', async () => {
  const task = await seedTask();

  const res = await request(app)
    .put(`/api/tasks/${task.id}`)
    .send({ title: 'Updated title', description: 'Updated desc' });

  expect(res.status).toBe(200);
  expect(res.body.task.title).toBe('Updated title');
  expect(res.body.task.description).toBe('Updated desc');
  expect(res.body.task.id).toBe(task.id);
});

// 6. PUT /:nonexistent → 404
test('PUT /api/tasks/:nonexistent returns 404', async () => {
  const res = await request(app)
    .put('/api/tasks/nonexistent-id')
    .send({ title: 'Ghost task' });

  expect(res.status).toBe(404);
  expect(res.body.error).toBeDefined();
});

// 7. PATCH /:id/toggle → flips completed field
test('PATCH /api/tasks/:id/toggle flips the completed field', async () => {
  const task = await seedTask();
  expect(task.completed).toBe(false);

  const res = await request(app).patch(`/api/tasks/${task.id}/toggle`);

  expect(res.status).toBe(200);
  expect(res.body.task.completed).toBe(true);

  // Toggle back
  const res2 = await request(app).patch(`/api/tasks/${task.id}/toggle`);
  expect(res2.body.task.completed).toBe(false);
});

// 8. DELETE /:id → 200 + success message
test('DELETE /api/tasks/:id returns 200 and success message', async () => {
  const task = await seedTask();

  const res = await request(app).delete(`/api/tasks/${task.id}`);

  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Task deleted');
});

// 9. DELETE /:nonexistent → 404
test('DELETE /api/tasks/:nonexistent returns 404', async () => {
  const res = await request(app).delete('/api/tasks/nonexistent-id');

  expect(res.status).toBe(404);
  expect(res.body.error).toBeDefined();
});
