import { Router } from 'express';
import { saveResume, loadResume } from '../controllers/resumeController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

// All resume routes require authentication
router.use(protect);

router.post('/', saveResume);  // Save / update resume
router.get('/',  loadResume);  // Load resume

export default router;
