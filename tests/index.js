var request = require('supertest')
const app = require('../app.js');

describe('POST /videos', function () {
    it('with proper file returns 200', function (done) {
        request(app)
            .post('/videos')
            .set('Accept', 'application/json')
            .field('name', 'Sample Video')
            .attach('avatar', './tests/videoFiles/small.mp4')
            .expect(204, done);
    });
});
