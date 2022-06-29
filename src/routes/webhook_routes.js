const { Router } = require('express');
const {
  webhookVerify,
  webhookReceptionMsg,
} = require('../controller/webhook_controller');

const router = Router();

router.get('/webhook', webhookVerify);
router.post('/webhook', webhookReceptionMsg);
router.get('/', (req, res) => res.json('ok'));

module.exports = router;
