before(() => {
    process.env.NODE_ENV = 'test';
    console.log(process.env.NODE_ENV);
})
after(() => {
    var del = require('del');

    process.env.NODE_ENV = 'develop';
    del.sync(['uploads/tests/**'])

})
describe('POST /videos', function (done) {
    it('with proper file returns 200', function (done) {
        var request = require('supertest')
        const app = require('../src/app.js');
        request(app)
            .post('/videos')
            .set('Accept', 'application/json')
            .field('name', 'Sample Video')
            .attach('video', './test/videoFiles/small.mp4')
            .expect(200, done);
    });
});
