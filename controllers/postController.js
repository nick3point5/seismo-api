const db = require('../models');

const index = (req,res) => {
  db.Post.find(
    {},
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}
      res.json(obj)
  })
}

const create = (req,res) => {
  objData = {
    ...(req.body),
  }

  db.Post.create(
    objData,
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}
        res.json(obj)
    })
    
}

const show = (req,res) => {
  db.Post.findById(
    req.params.id,
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}
      res.json(obj)
  })
  
}

const update = (req,res) => {

    const updateObj = req.body
  
    db.Post.findByIdAndUpdate(
      req.params.id,
      updateObj,
      {new: true},
      (err, obj) => {
        if (err) {
          console.log('Error:');
          console.log(err);
        }
        res.json(obj)
      }
    )
}

const remove = (req,res) => {
  db.Post.findById(
    req.params.id,
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}

      if (!obj.topPost) {
        db.Post.deleteMany(
          {topPost:req.params.id},
          (err, obj) => {
            if (err) {
              console.log('Error:');
              console.log(err);
            }
          })
      }
      db.Post.findByIdAndDelete(
        req.params.id,
        (err, obj) => {
          if (err) {
            console.log('Error:');
            console.log(err);
          }
          res.json(obj)
      })
    }
  )
}

const clear = (req,res) => {
  db.Post.deleteMany(
    {},
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);
      }
      res.json(obj)
    })
}

const getPosts = (req,res) =>{
  db.Post.findById(
    req.params.id,
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}
  })
    .then((obj)=>{
    db.Post.find(
      {
      _id: obj.reply
      },
      (err, obj) => {
        if (err) {
          console.log('Error:');
          console.log(err);}
        res.json(obj)
      })
    })
}

const reply = (req,res) => {
  let objData = {
    ...(req.body),
    // ownerId: req.session.currentUser._id
  }
  db.Post.findById(
    req.params.id,
    (err, parentPost) => {
      if (err) {
        console.log('Error:');
        console.log(err);}
      if(parentPost.topPost){
        objData.topPost=parentPost.topPost
      }else{
        objData.topPost=req.params.id
      }
      db.Post.create(
        objData,
        (err, postObj) => {
          if (err) {
            console.log('Error:');
            console.log(err);}  
          parentPost.reply.push(postObj._id)
          const updateObj = parentPost
          db.Post.findByIdAndUpdate(
            req.params.id,
            updateObj,
            {new: true},
            (err, obj) => {
              if (err) {
                console.log('Error:');
                console.log(err);
              }
              res.json(postObj)
            }
          )
        })
  })
}

module.exports = {
  index,
  create,
  show,
  update,
  remove,
  clear,
  getPosts,
  reply
}
