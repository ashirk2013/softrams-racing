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

app.get('/api/members/:id', (req, res) => {
  let id = req.params.id;
  if (id && id != 0) {
    axios.get(`http://localhost:3000/members/${id}`)
      .then(response => {
        if (response.status === 200) {
          return res.send(response.data);
        }
      })
      .catch(error => {
        console.error(error);
        return res.status(response.status).send();
      });
  } else {
    res.send();
  }
});

app.delete('/api/members/:id', (req, res) => {
  let id = req.params.id;
  if (id && id != 0) {
    axios.delete(`http://localhost:3000/members/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return res.send(response.data);
        }
      })
      .catch(error => {
        console.error(error);
        return res.status(response.status).send();
      });
  } else {
    res.send();
  }
});

app.put('/api/members/:id', (req, res) => {
  let id = req.params.id;
  if (id && id != 0) {
    axios.put(`http://localhost:3000/members/${id}`, req.body)
      .then((response) => {
        if (response.status === 200) {
          return res.send(response.data);
        }
      })
      .catch(error => {
        console.error(error);
        return res.status(response.status).send();
      });
  } else {
    res.send();
  }
});

app.get('/api/members', (req, res) => {
  axios.get('http://localhost:3000/members')
    .then((response) => {
      if (response.status === 200) {
        return res.send(response.data);
      }
    })
    .catch(error => {
      console.error(error);
      return res.status(response.status).send();
    });
});

app.get('/api/teams', (req, res) => {
  axios.get('http://localhost:3000/teams')
    .then((response) => {
      if (response.status === 200) {
        return res.send(response.data);
      }
    })
    .catch(error => {
      console.error(error);
      return res.status(response.status).send();
    });
});

// Submit Form!
app.post('/api/members', (req, res) => {
  console.log(req.body);
  axios.post('http://localhost:3000/members', req.body)
    .then((response) => {
      if (response.status === 201) {
        return res.send(response.data);
      }
    })
    .catch(error => {
      console.error(error);
      return res.status(response.status).send();
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});

app.listen('8000', () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});
