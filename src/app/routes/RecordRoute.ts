import express from 'express';
import path from 'path';
import { uploadImage, upload, getAuditTrail, verifyToken, getAllRecord, getRecord, addRecord, addMultipleRecord, addRecordNoCode, addMultiplePermissionRecord, updateRecord, deleteAllRecord, deleteRecord, uploadMultipleAttachment, deleteImage, getAllAuditTrail} from '..';

const router = express.Router();

router.get("/getallrecord/:table", getAllRecord);
router.get("/getrecord/:table/:field/:data", getRecord);
router.post("/addrecord/:table", addRecord);
router.post("/addmultiplerecord/:table", addMultipleRecord);
router.post("/addrecordnocode/:table", verifyToken, addRecordNoCode);
router.post("/addmultiplerecord/:table", addMultipleRecord);
router.post("/addmultiplepermission", addMultiplePermissionRecord);
router.put("/updaterecord/:table/:field/:data", updateRecord);
router.delete("/deleteallrecord/:table", deleteAllRecord);
router.delete("/deleterecord/:table/:field/:data", verifyToken, deleteRecord);
router.post("/uploadimage/:table/:field/:data", upload.single("image"), uploadImage);
router.post("/uploadattachment/:table", upload.array("image"), uploadMultipleAttachment);
router.get("/deleteimage/:table/:field/:data", deleteImage);
router.get("/images/:imageName", (req:any, res:any) => {
  const { imageName } = req.params;
  const imagePath = path.join(__dirname, "..", "public", "images", imageName);
  res.sendFile(imagePath);
});
router.post("/addaudit/:table", addRecordNoCode);
router.get("/getaudit/:table/:userId", getAuditTrail);
router.get("/getallaudit/:table", verifyToken, getAllAuditTrail);

export default router;