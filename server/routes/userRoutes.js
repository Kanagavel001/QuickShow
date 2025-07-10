import express from 'express';
import { getFavorites, getUserBookings, isUser, updateFavorite } from '../controllers/userController.js';
import { protectUser } from '../middleware/auth.js';


const userRouter = express.Router();

userRouter.get('/is-user', protectUser, isUser);
userRouter.get('/bookings', getUserBookings);
userRouter.post('/update-favorite', updateFavorite);
userRouter.get('/favorites',  getFavorites);

export default userRouter;