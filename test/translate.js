var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('GET fr -> ko translation', () => {
	it('should return a translation', (done) => {
		chai.request(server)
			.get('/translate?sourceLanguage=fr&targetLanguage=ko&input=test')
			.end((err, res) => {
                res.should.have.status(200);
                console.log('Translation: ' + res.text);
                done();
            });
	})
})

describe('GET fr -> ar translation', () => {
	it('should return a translation', (done) => {
		chai.request(server)
			.get('/translate?sourceLanguage=fr&targetLanguage=ar&input=test')
			.end((err, res) => {
                res.should.have.status(200);
                console.log('Translation: ' + res.text);
                done();
            });
	})
})

describe('GET es -> ja translation', () => {
	it('should return a translation', (done) => {
		chai.request(server)
			.get('/translate?sourceLanguage=es&targetLanguage=ja&input=prueba')
			.end((err, res) => {
                res.should.have.status(200);
                console.log('Translation: ' + res.text);
                done();
            });
	})
})
