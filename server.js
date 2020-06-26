const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
  helmet({
    noCache: true
  })
);
app.use(
  hsts({
    maxAge: 15552000 // 180 days in seconds
  })
);

app.use(
  express.static(path.join(__dirname, 'dist/softrams-racing'), {
    etag: false
  })
);

app.get('/api/members', (req, res) => {
  console.log('   +++ GET /api/members');
  axios.get('http://localhost:3000/members')
    .then((response) => {
      console.log('   +++ response get api/members');
      console.log(response.status);
      if (response.status === 200) {
        return res.send(response.data);
      }
    })
    .catch((error) => {
      console.log('   +++ error GET /api/members');
      console.log(error);
    });
});

app.get('/api/teams', (req, res) => {
  axios.get('http://localhost:3000/teams')
    .then((response) => {
      if (response.status === 200) {
        return res.send(response.data);
      }
    })
    .catch((error) => {
      console.log('   +++ error GET /api/teams');
      console.log(error);
    });
});

// Submit Form!
app.post('/api/addMember', (req, res) => {
  console.log('   +++ POST api/addMember');
  console.log(req.body);
  axios.post('http://localhost:3000/members', req.body)
    .then((response) => {
      console.log('   +++ response POST /api/addMember');
      console.log(`   +++ status: ${response.status}`);
      if (response.status === 201) {
        return res.send(response.data);
      }
    })
    .catch((error) => {
      console.log('   +++ error GET /api/teams');
      console.log(error);
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});

app.listen('8000', () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});
