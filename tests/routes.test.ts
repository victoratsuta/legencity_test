import {app, server} from "../src";

const request = require("supertest");

jest.useFakeTimers();

describe('Task Endpoints', () => {

    let newServer: any;
    let agent: any;
    let taskId: number | null = null;

    beforeAll(async (done) => {
        await server.close();
        newServer = app.listen(4000, () => {
            agent = request.agent(newServer);
            done();
        });
    });

    afterAll(async () => {
        await newServer.close();
    });

    it('should create a new task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .send({
                name: "test",
                priority: 100,
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('priority')

        taskId = res.body.id
    });

    it('should create validation error', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .send({
                name: "test",
            })
        expect(res.statusCode).toEqual(403)
    })

    it('should get high priority', async () => {
        const res = await request(app)
            .get('/api/tasks')
        expect(res.statusCode).toEqual(200)
        expect(res.body.priority).toEqual(100)
    })

    it('should delete', async () => {
        const res = await request(app)
            .delete('/api/tasks/' + taskId)
        expect(res.statusCode).toEqual(200)
    })
})