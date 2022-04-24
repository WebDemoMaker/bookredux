var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Books = require('../modal/Book');
var Users = require('../modal/User');
const jwt = require('jsonwebtoken')
const jwtKey = "mysecret"
var Orders = require('../modal/Checkout');

mongoose.connect('mongodb+srv://vivek:Vivrk%40%405391148@avatar-cluster.t1hoc.mongodb.net/Bookhub?retryWrites=true&w=majority')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


function checkAuth(req, res, next) {

  const { authorization } = req.headers
  // console.log(req.headers)
  if (!authorization) {
    return res.json({ success: 0, message: "Please login first to access this route" })
  }
  else {
    const token = authorization.replace("Bearer ", "")
    payload = jwt.verify(token, jwtKey, (err, payload) => {
      // console.log(err,"++++++++++++++++++++++++++++",payload)
      if (err) { console.log("jwt not verified") }
      // console.log("++++++++++++++++++++++++++++++",payload)
      const { email } = payload
      req.auth_email = email
      next()

      // User.findOne({email:email},(err,result)=>{
      //   if(!result){
      //     console.log("inside if")

      //     return res.json({success:0,message:"user not exist"})
      //   }
      //   else
      //   {
      //     console.log("inside else")
      //     auth_user_email=email
      //     // console.log("________________________________0",auth_user_email)
      //   }
      //   // else
      //   // {

      //   // }
      // }).then(()=>{
      //   next()
      // }).catch(err=>{
      //   next()
      // })

    })


  }

}

// router.post('/api/save/book',checkAuth,(req,res)=>{
//   let {title,description,price,for_sale,keywords,secure_url,email}=req.body

//   let book = new Books({
//     title,
//     price,
//     keywords
//   })
//   book.save().then(saved=>{
//     res.json({success:1,message:"book saved successfully"})
//   }).catch(err=>{
//     res.json({success:0,message:"Error occured in saving book data"})
//   })

// })

router.post('/api/login', (req, res) => {
  const { email, password } = req.body
  Users.findOne({ email }).then(user => {
    console.log("user is ==========", user)
    if (user) {
      const token = jwt.sign(
        { email },
        jwtKey,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      user.save()
      res.json({ success: 1, user, message: "user found" })
    }
    else {
      res.json({ success: 0, message: "user not found", user: {} })
    }
  }).catch(err => {
    console.log(err)
  })

})



//----------------fetch book  data =------------

router.get('/api/fetch/book/:filter?', checkAuth, (req, res) => {
  let filter = req.params.filter
  console.log("filter is=========", filter)
  let pattern = new RegExp(filter, 'i')
  if (filter) {
    Books.find({ title: { $regex: pattern } }).then(books => {
      if (books[0]) {
        res.json({ success: 1, message: "book found", books })
      }
      else {
        res.json({ success: 0, message: "no book found", books: [] })
      }
    }).catch(err => {
      res.json({ success: 0, message: "some error occurred", books })
    })
  }
  else {
    Books.find({}).then(books => {
      if (books[0]) {
        res.json({ success: 1, message: "book found", books })
      }
      else {
        res.json({ success: 0, message: "no book found", books: [] })
      }
    }).catch(err => {
      res.json({ success: 0, message: "some error occurred", books })
    })
  }
})


// router.post('/api/find/book/',(req,res)=>{
//   let booksid = req.body.bookid
//   console.log(booksid)
//   console.log(typeof(booksid))


//   Books.find({_id:{$in:booksid}}).then(books=>{
//     if(books[0])
//     {
//       res.json({success:1,books})
//     }
//     else
//     {
//       res.json({success:0,books:[]})
//     }
//   })
// })


router.post('/api/save/payment', checkAuth, (req, res) => {
  let { name, address, email, phone } = req.body

  let order = new Orders({


    address,
    email,
    phone
  })

  order.save().then(data => {
    res.json({ success: 1, message: "Order saved successfully" })
  }).catch(err => {
    res.json({ success: 0, message: "Error occured in saving order" })
  })

})

module.exports = router;
