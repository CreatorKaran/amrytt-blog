import { Router } from 'express';

import blogRoutes from './blogRoutes';
import commentRoutes from './commentRoutes';

const router = Router();

router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);

export default router;
