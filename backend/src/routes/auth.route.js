import express from 'express';
import {signUp, signIn, signOut, test} from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup",signUp);
router.post("/signin",signIn);
router.get("/signout",signOut);
router.get("/test1",test);

export default router;