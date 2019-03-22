const express = require('express');
const router = express.Router();
const projectDB = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
  projectDB
    .get()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).send({ error: 'Error when handling route.' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  projectDB
    .get(id)
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).send({ error: 'Error when handling route' });
    });
});

router.get('/:id/action', (req, res) => {
  const { id } = req.params;
  projectDB
    .getProjectActions(id)
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).send({ error: 'Error when handling route' });
    });
});

router.post('/', (req, res) => {
  projectDB
    .insert(req.body)
    .then(addProject => {
      res.status(201).json(addProject);
    })
    .catch(err => {
      res.status(500).json({
        error: 'Error when handling route'
      });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  projectDB
    .update(id, req.body)
    .then(response => {
      if (response === null) {
        res.status(404).json({ error: 'There is no project with that id.' });
      } else {
        res.status(200).json(response);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'There was an error while updating this project.' });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  projectDB
    .remove(id)
    .then(removeProject => {
      if (removeProject) {
        res.status(200).json(removeProject);
      } else {
        res
          .status(404)
          .json({
            message: 'The project with the specified ID does not exist.'
          });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The project could not be removed' });
    });
});

module.exports = router;
