import express from 'express';
import * as controllers from '../controllers/filedirectory'
import multer from 'multer';

const upload = multer({dest:'uploads/'});
const route = express.Router();

route.post('/testfile', upload.single('photo') , controllers.insertFile)

export default route;