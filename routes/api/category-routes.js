const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: {model: Product}
  })
  .then(dbCategory => res.json(dbCategory))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    include: {model: Product},
    where:{ id: req.params.id }
  })
  .then(dbCategory => {
    if (dbCategory === null) {
      res.send('Not Found');
    } else {
      res.json(dbCategory)
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then((newCategory) =>{
    if(!newCategory){
      res.send("Empty Category")
    }else{
      res.send(newCategory)
    }
  }
    )
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
  {
    where:{
      id: req.body.id
    }
  })
  .then((updatedCategory) =>{
    res.send(updatedCategory)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id: req.params.id
    } 
  })
  .then(
    res.send(`Category ${req.params.id} deleted`)
  )
});

module.exports = router;
