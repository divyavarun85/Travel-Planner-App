import "babel-polyfill"
import {postData}  from '../src/client/js/app'
require('jest-fetch-mock').enableMocks()

const regeneratorRuntime = require("regenerator-runtime");

const app = require('../src/server/index.js') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)


test('Test for post data success', () => {
    return postData('http://localhost:8081/travel',{ Date:'2020/06/10' }).then(data => {
      expect(data.status).toBe(200);
    });
  });



/**Server side testing - To test the endpoint */
  it('gets the test endpoint', async done => {
    const response = await request.get('/')
  
    expect(response.status).toBe(200)
    done()
  })