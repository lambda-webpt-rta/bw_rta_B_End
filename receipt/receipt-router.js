const express = require('express');

const Receipt = require('./receipt-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Receipt.find()
  .then(receipt => {
    res.json(receipt);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Receipt' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Receipt.findById(id)
  .then(receipt => {
    if (receipt) {
      res.json(receipt);
    } else {
      res.status(404).json({ message: 'Could not find Receipt with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get Receipt' });
  });
});

router.get('/:id/steps', (req, res) => {
  const { id } = req.params;

  Receipt.findSteps(id)
  .then(steps => {
    if (steps.length) {
      res.json(steps);
    } else {
      res.status(404).json({ message: 'Could not find steps for given Receipt' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get steps' });
  });
});

router.post('/', (req, res) => {
  const receiptData = req.body;

  Receipt.add(receiptData)
  .then(receipt => {
    res.status(201).json(receipt);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new Receipt' });
  });
});

router.post('/:id/steps', (req, res) => {
  const stepData = req.body;
  const { id } = req.params; 

  Receipt.findById(id)
  .then(receipt => {
    if (receipt) {
        receipt.addStep(stepData, id)
      .then(step => {
        res.status(201).json(step);
      })
    } else {
      res.status(404).json({ message: 'Could not find Receipt with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new step' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Receipt.findById(id)
  .then(receipt => {
    if (receipt) {
        receipt.update(changes, id)
      .then(updatedReceipt => {
        res.json(updatedReceipt);
      });
    } else {
      res.status(404).json({ message: 'Could not find Receipt with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update Receipt' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Receipt.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find Receipt with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete' });
  });
});

module.exports = router;