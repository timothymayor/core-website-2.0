const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const { isEmpty } = require('validator');
const apiModel = require("../models/api");
const commentMOdel = require("../models/contactform")

/* GET home page. */
router.get('/dashboard', auth, async function(req, res) {
  var allApis = await apiModel.find({});
  var approvedApis = await apiModel.find({ status: "approved" });
  var pendingApis = await apiModel.find({ status: "pending" });

  res.render('pages/dashboard', {
    pageName: 'Dashbord',
     allApisCount: allApis.length,
     pendingApisCount: pendingApis.length,
     approvedApisCount: approvedApis.length,
     allApis: allApis,
     pendingApis: pendingApis,
     approvedApis: approvedApis
  });
});

router.get('/approve-api', auth, async function(req, res) {
    apiName = req.query.api;
    await apiModel.updateOne({ name: apiName }, { status: "approved" });
    req.flash("success", "API Approved");
    res.redirect('/dashboard');
});

router.get('/delete-api', auth, async function(req, res) {
    apiName = req.query.api;
    await apiModel.deleteOne({ name: apiName });
    req.flash("success", "API Disapproved");
    res.redirect('/dashboard');
});

//Change this to the homepage or index
router.get('/register-api', (req, res) => {
  res.render('pages/addapi', {
    pageName: 'API Form'
  })
});


router.post('/contact', (req, res) => {
    const { fname, email, comments } = req.body;
    const newComment = new commentMOdel({ fname, email, comments})
    newComment.save().then( () => {
      req.flash("success", "Thanks for contacting us...");
      res.redirect('/');
    }).catch(err => {
      console.log(err)
          req.flash("error", "comment not saved please try again");
          res.redirect('/contact');
      })
    
})

router.post('/register-api', (req, res) => {
    const { owner, name, url, img, desc } = req.body;
    let newApi = new apiModel({ owner, name, url, img, desc, status: "pending" });
    newApi.save().then(api => {
        req.flash("success", "API Registered");
        res.redirect('/register-api');
    }).catch(err => {
    console.log(err)
        req.flash("error", "Some error occured, please try again");
        res.redirect('/register-api');
    })
})

router.get('/', async (req, res) => {
  const approvedApis = await apiModel.find({ status: "approved" });
  // var allApis = await apiModel.find({});
  res.render('pages/index', {
    pageName: 'Home',
    apis: approvedApis
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
