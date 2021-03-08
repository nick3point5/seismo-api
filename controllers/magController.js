const db = require('../models');

setInterval(() => {
  db.Post.deleteMany(
    {
    magnitude: {$lte:0}
    },
    (err, obj) => {
      if (err) {
        console.log('Error:');
        console.log(err);}
  })
    .then(()=>{
      db.Post.find(
        {},
        (err, obj) => {
          if (err) {
            console.log('Error:');
            console.log(err);}
      })
        .then((obj)=>{
          obj.forEach((post)=>{
            const currentMag = magnitude(post.power,post.createdAt)
            if (currentMag!==post.magnitude) {
              updateObj={
                magnitude:currentMag,
              }

              db.Post.findByIdAndUpdate(
                post._id,
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
        })
    })
    
}, 1000*60*60);

function magnitude(power, created){
  const growth = 6.287728772
  const spread = 0.034613447
  const shift = 4.326726157
  const decay = 0.055555556

  const time = (new Date() - created)/1000/60/60
  return (growth*Math.log10(power*spread+shift)-time*decay)
}

module.exports = {
  magnitude
}
