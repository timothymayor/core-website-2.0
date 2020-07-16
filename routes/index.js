const express = require('express');
const router = express.Router();
const {api} = require('../controller/admin');

/* GET home page. */
router.get('/dashboard', function(req, res) {
  res.render('pages/dashboard', {
    pageName: 'Dashbord',
    api: api,
     apilist: [{
         name: 'Barry Dick',
         id: 'API234',
         url: '/barry/api'
       },
       {
         name: 'Ronald Taylor',
         id: 'API244',
         url: '/Ronald/api'
       },
       {
         name: 'Jacob Hunter',
         id: 'API245',
         url: '/Jacob/api'
       },
       {
         name: 'Juan Mitchell',
         id: 'API255',
         url: '/Juan/api'
       },
     ]
  });
});

//Change this to the homepage or index
router.get('/', (req, res) => {
  res.render('pages/exampleHomepage', {
    pageName: 'Home',
    apis: api
  })
});

router.get('/login', (req, res) => {
  res.render('pages/login', {
    pageName: 'Login'
  });
});

module.exports = router;
