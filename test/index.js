const request = require('supertest');
const expect = require('expect');
const app = require('../server/app');


describe('GET /', () => {
  it('responds with an authentication page', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /text/)
      .expect(302)
      .end((err, res) => {
        expect(res.get('location')).toContain('https://quick.1up.health/connect');
        return done();
      });
  });
});
describe('GET /callback', () => {
  it('responds with OK', (done) => {
    request(app)
      .get('/callback')
      .expect(200, done);
  });
});
