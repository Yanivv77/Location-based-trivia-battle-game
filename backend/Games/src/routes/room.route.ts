import { Router } from "express";
const roomRouter = Router();
const roomController = require('./../controllers/room.controller');



//get single Room by id
roomRouter.get('/room/:id', roomController.getRoomById);

// Add a Room
roomRouter.post('/room', roomController.createRoom);

export { roomRouter };

