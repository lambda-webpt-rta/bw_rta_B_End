const express = require('express');

const Recipe = require('./recipe-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Recipe.find()
  .then(recipe => {
    res.json(recipe);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Recipe' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Recipe.findById(id)
  .then(recipe => {
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Could not find Recipe with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Recipe' });
  });
});

router.get('/:id/steps', (req, res) => {
  const { id } = req.params;

  Recipe.findSteps(id)
  .then(steps => {
    if (steps.length) {
      res.json(steps);
    } else {
      res.status(404).json({ message: 'Could not find steps for given Recipe' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get steps' });
  });
});

router.post('/', (req, res) => {
  const recipeData = req.body;

  Recipe.add(recipeData)
  .then(recipe => {
    res.status(201).json(recipe);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new Recipe' });
  });
});

router.post('/:id/steps', (req, res) => {
  const stepData = req.body;
  const { id } = req.params; 

  Recipe.findById(id)
  .then(recipe => {
    if (recipe) {
        recipe.addStep(stepData, id)
      .then(step => {
        res.status(201).json(step);
      })
    } else {
      res.status(404).json({ message: 'Could not find Recipe with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new step' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Recipe.findById(id)
  .then(recipe => {
    if (recipe) {
        Recipe.update(changes, id)
      .then(updatedRecipe => {
        res.json(updatedRecipe);
      });
    } else {
      res.status(404).json({ message: 'Could not find Recipe with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update Recipe' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Recipe.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find Recipe with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete' });
  });
});

module.exports = router;