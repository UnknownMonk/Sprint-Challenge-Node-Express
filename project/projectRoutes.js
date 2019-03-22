const express = require('express');
const router = express.Router();
const projectDB = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
  projectDB
    .get()
    .then(actions => {
      res.json(actions);
    })
    .catch(err => {
      res.status(500).send({ error: 'Error when handling route.' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  projectDB
    .get(id)
    .then(actions => {
      res.json(actions);
    })
    .catch(err => {
      res.status(500).send({ error: 'Error when handling route' });
    });
});

router.get('/:id/action', (req, res) => {
  const { id } = req.params;
  projectDB
    .getProjectActions(id)
    .then(actions => {
      res.json(actions);
    })
    .catch(err => {
      res.status(500).send({ error: 'Error when handling route' });
    });
});

router.post('/', (req, res) => {
  projectDB
    .insert(req.body)
    .then(addAction => {
      res.status(201).json(addAction);
    })
    .catch(err => {
      res.status(500).json({
        error: 'There was an error while saving the post to the database'
      });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  projectDB
    .update(id, req.body)
    .then(response => {
      if (response === null) {
        res.status(404).json({ error: 'There is no action with that id.' });
      } else {
        res.status(200).json(response);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'There was an error while updating this action.' });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  projectDB
    .remove(id)
    .then(removePost => {
      if (removePost) {
        res.status(200).json(removePost);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The post could not be removed' });
    });
});

module.exports = router;
