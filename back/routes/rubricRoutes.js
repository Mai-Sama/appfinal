const express = require('express');
const router = express.Router();
const rubricController = require('../controllers/rubricController');

// Rúbricas estándar globales
router.get('/', rubricController.getAllRubrics);
router.post('/', rubricController.createGlobalRubric);
router.put('/:id', rubricController.updateRubric);
router.delete('/:id', rubricController.deleteRubric);

// Rúbricas por tarea
router.get('/task/:tareaId', rubricController.getRubricsByTask);

// Calificaciones por rúbrica
router.get('/submission/:entregaId', rubricController.getSubmissionGrades);
router.post('/submission/:entregaId/grades', rubricController.gradeSubmissionRubrics);

module.exports = router;
