import {RequestHandler} from 'express';
import client from '../config/db';
const cloudinary = require('cloudinary').v2;
import * as uuid from 'uuid';

const insertFile: RequestHandler = async (req, res) => {
  const fileData: any = req.file;
  console.log(fileData);
  console.log(req.body)
  const {path} = req.body;
  const folders = path.split("/");
  const uploadData = await cloudinary.uploader.upload(fileData.path, {
    folder: 'samples',
    use_filename: true
   });

  const fileDetails = { 
    id: uuid.v4(),
    name: fileData.originalname,
    format: fileData.originalname.split('.')[1],
    size: fileData.size,
    createdAt: req.body.createdAt? new Date(req.body.createdAt): new Date(Date.now()),
    filelink: uploadData.secure_url,
    updatedAt: req.body.updatedAt? new Date(req.body.updatedAt): null,

  }
  
  const result = await client.query(`insert into files(id, filename, format, size, "createdAt", "updatedAt", filelink) values($1, $2, $3, $4, $5, $6, $7)`,
  [fileDetails.id, fileDetails.name, fileDetails.format,fileDetails.size,fileDetails.createdAt,fileDetails.updatedAt,fileDetails.filelink]);
  
  let pid;
  let parentid = await client.query(`select pid from path where level = 0`)
  console.log(parentid);
  for(let i=0; i<folders.length; i++) {
    
    const result = await client.query(`select * from path where parentid = ${parentid} and lvl = i+1 and foldername = folders[i]`);
    if(!result.rowCount) 
    {
      pid = uuid.v4();
      const pathData = await client.query(`insert into path(pid, foldername, parentid) values($1, $2, $3)`, [pid, folders[i], parentid]);
      const pathFileData = await client.query(`insert into pathfile(pid, fid) values($1, $2)`, [pid,fileDetails.id])
      if(!pathData.rowCount || !pathFileData.rowCount) res.status(500).send('folder not inserted');
    } //f1 set parentid = pid
    //sf1 set parentid = sf1 , ssf1 set parentid = ssf1pid 
    //insert into filepath pid, fileid 
  } 
  //const resultPath = 
  res.status(200).send('inserted')//result.rowCount);
}

export {
  insertFile,
}