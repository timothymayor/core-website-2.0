const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const {api} = require('../data/api');


let homedatas = []
for (let data in api) {
  homedatas.push(...api[data]);
}


/* GET home page. */
router.get('/dashboard', auth, function(req, res) {
  res.render('pages/dashboard', {
    pageName: 'Dashbord',
    apis: api,
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
router.get('/register-api', auth, (req, res) => {

  res.render('pages/addapi', {
    pageName: 'API Form'
  })


});



router.get('/', (req, res) => {
  res.render('pages/index', {
    pageName: 'Home',
    apis: homedatas
  })
});



// console.log(api);
router.get('/login', (req, res) => {
  if(req.session.auth) {
      res.redirect('/dashboard');
  }
  res.render('pages/login', {
    pageName: 'Login'
  });
});
router.get('/blog', (req, res) => {
  res.render('pages/blog', {
    pageName: 'blog'
  });
});
router.get('/contact', (req, res) => {
  res.render('pages/contact', {
    pageName: 'contact'
  });
});
router.get('/about', (req, res) => {
  res.render('pages/about', {
    pageName: 'about'
  });
});

router.get('/logout', (req, res) => {
    req.session.auth = false;
    req.session.email = null;
    res.redirect('/');
})

module.exports = router;
