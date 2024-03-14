import  express from 'express';
const router = express.Router();
import {
    authUser ,
    registerUser ,
    logoutUser,
    getUserProfile,
    updateUserProfile
} from '../controllers/userController.js';


// /api/users/
router.post('/' , registerUser);
router.post('/auth' , authUser)
router.post('/logout' , logoutUser)




export default router;
