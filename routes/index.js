var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Micro API',
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

router.get('/login', (req, res, next)=> {
  res.render('login');
});

module.exports = router;
