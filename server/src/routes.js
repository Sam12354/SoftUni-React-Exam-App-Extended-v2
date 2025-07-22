import { Router } from 'express'
import homeController from './controllers/homeController.js'
import authController from './controllers/authController.js'
import itemController from './controllers/itemController.js'
import userController from './controllers/userController.js'
import reviewController from './controllers/reviewController.js'; 
import commentController from './controllers/commentController.js';
import { changePasswordController } from './controllers/changePasswordController.js'

const routes = Router()

routes.use(homeController)
routes.use('/auth', authController)
routes.use('/item', itemController)
routes.use('/me', userController)
routes.use('/review', reviewController)
routes.use('/comment', commentController);
routes.put('/changePassword', changePasswordController);

routes.all('*', (req, res) => {
    res.status(404).json({ error: "Not Found" });
})

export default routes