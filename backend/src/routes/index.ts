import { Router } from 'express';

import blogRoutes from './blogRoutes';
import commentRoutes from './commentRoutes';
import ratingRoutes from './ratingRoutes';

const router = Router();

router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);
router.use('/ratings', ratingRoutes);


export default router;
