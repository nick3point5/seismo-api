const db = require('../models');
const {magnitude} = require('./magController')

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
  recursiveDelete(req.params.id)
  db.Post.findOne(
    {
      reply: req.params.id
    },
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}
  })
    .then((obj)=>{
      if (obj && obj.reply.length) {        
        const filter = obj.reply.filter(reply=>{
          return reply+''!==req.params.id
        })

          const updateObj = {
            reply: filter
          }
        
          db.Post.findByIdAndUpdate(
            obj._id,
            updateObj,
            {new: true},
            (err, obj) => {
              if (err) {
                console.log('Error:');
                console.log(err);
              }
            }
          )
      }
    })
    

    .then(()=>{
      res.json({message:'deleted post'})
    })
    .catch(err=>console.log(err)
    )
    
  
}

function recursiveDelete(parent) {
  return db.Post.find(
    {
    parent: parent
    },
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}
  })
  .then((objArr)=>{
    if(objArr && objArr.length>0){
      objArr.forEach(obj => {
        recursiveDelete(obj._id)
      });
    }

  })
  .then(()=>{
    db.Post.findByIdAndDelete(
      parent,
      (err, obj) => {
        if (err) {
          console.log('Error:');
          console.log(err);
        }
      })
  })
  .catch(err=>console.log(err))
  
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
      if(obj){
        db.Post.find(
          {
          _id: obj.reply
          },
          (err, obj) => {
            if (err) {
              console.log('Error:');
              console.log(err);}
            res.json(obj)
          }
        )
      }else{
        res.json({message:"no posts"})
      }      
    })
    
}

const reply = (req,res) => {
  let objData = {
    ...(req.body),
    parent:req.params.id
  }
  db.Post.findById(
    req.params.id,
    (err, parentPost) => {
      if (err) {
        console.log('Error:');
        console.log(err);}

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
            .then(()=>{
              increaseMag(req.params.id)
            }
          )
        })
  })
}

function increaseMag(parent){
  db.Post.findById(
    parent,
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}
    })
    .then((obj)=>{
      obj.power++
      obj.magnitude = magnitude(obj.power,obj.createdAt)
      
      db.Post.findByIdAndUpdate(
        obj._id,
        obj,
        {new: true},
        (err, obj) => {
          if (err) {
            console.log('Error:');
            console.log(err);}
          if (obj.parent) {
            increaseMag(obj.parent)
          }
        }
      )
    })
    .catch(err=>console.log(err))
}

const get10 = (req,res) => {
  db.Post.find(
    {},
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}
      res.json(obj)
  })
  .sort( { magnitude: -1 } )
  .limit( 10 )
}

module.exports = {
  index,
  create,
  show,
  update,
  remove,
  clear,
  getPosts,
  reply,
  get10,
  clear,
}
