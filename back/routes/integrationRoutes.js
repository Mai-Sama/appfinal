const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const integrationController = require('../controllers/integrationController');

// POST /api/integrations/transcribe-url  { url }
router.post('/transcribe-url', integrationController.transcribeFromUrl);
// POST /api/integrations/transcribe-upload  (file form field 'file')
router.post('/transcribe-upload', upload.single('file'), integrationController.transcribeUpload);
// POST /api/integrations/sapling  { text }
router.post('/sapling', integrationController.saplingAnalyze);

module.exports = router;
