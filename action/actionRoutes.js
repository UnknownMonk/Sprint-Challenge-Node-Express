const express = require('express');
const router = express.Router();
const actionDB = require('../data/helpers/actionModel');

router.get('/', (req, res) => {
  actionDB
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
  actionDB
    .get(id)
    .then(actions => {
      res.json(actions);
    })
    .catch(err => {
      res.status(500).send({ error: 'Error when handling route' });
    });
});

router.post('/', (req, res) => {
  actionDB
    .insert(req.body)
    .then(addAction => {
      res.status(201).json(addAction);
    })
    .catch(err => {
      res.status(500).json({
        error: 'Error when handling route '
      });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  actionDB
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
  actionDB
    .remove(id)
    .then(removeAction => {
      if (removeAction) {
        res.status(200).json(removeAction);
      } else {
        res
          .status(404)
          .json({
            message: 'The action with the specified ID does not exist.'
          });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The action could not be removed' });
    });
});

module.exports = router;
