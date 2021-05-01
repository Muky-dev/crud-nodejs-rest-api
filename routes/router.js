import express from 'express';
import * as controller from '../controller/controller.js';

const router = express.Router();

router.post('/user', controller.userPost);
router.get('/user', controller.userGetByNames);
router.get('/user/:nickname', controller.userGetNickname);
router.put('/user/:id', controller.userUpdateNameAndAdrressById);
router.put('/user/nick/:id', controller.userUpdateNickById);
router.delete('/user/:id', controller.userDelete);

export default router