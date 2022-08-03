const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: { model:Product }
  })
  .then(dbTag => res.json(dbTag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    include: { model:Product },
    where:{
      id: req.params.id
    }
  })
  .then(dbTag => res.json(dbTag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then((newTag) =>{
    if(!newTag){
      res.send("Empty Category")
    }else{
      res.send(newTag)
    }
  }
    )
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
