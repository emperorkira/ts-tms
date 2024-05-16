"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const __1 = require("..");
const router = express_1.default.Router();
router.get("/getallrecord/:table", __1.getAllRecord);
router.get("/getrecord/:table/:field/:data", __1.getRecord);
router.post("/addrecord/:table", __1.addRecord);
router.post("/addmultiplerecord/:table", __1.addMultipleRecord);
router.post("/addrecordnocode/:table", __1.verifyToken, __1.addRecordNoCode);
router.post("/addmultiplerecord/:table", __1.addMultipleRecord);
router.post("/addmultiplepermission", __1.addMultiplePermissionRecord);
router.put("/updaterecord/:table/:field/:data", __1.updateRecord);
router.delete("/deleteallrecord/:table", __1.deleteAllRecord);
router.delete("/deleterecord/:table/:field/:data", __1.verifyToken, __1.deleteRecord);
router.post("/uploadimage/:table/:field/:data", __1.upload.single("image"), __1.uploadImage);
router.post("/uploadattachment/:table", __1.upload.array("image"), __1.uploadMultipleAttachment);
router.get("/deleteimage/:table/:field/:data", __1.deleteImage);
router.get("/images/:imageName", (req, res) => {
    const { imageName } = req.params;
    const imagePath = path_1.default.join(__dirname, "..", "public", "images", imageName);
    res.sendFile(imagePath);
});
router.post("/addaudit/:table", __1.addRecordNoCode);
router.get("/getaudit/:table/:userId", __1.getAuditTrail);
router.get("/getallaudit/:table", __1.verifyToken, __1.getAllAuditTrail);
exports.default = router;
//# sourceMappingURL=RecordRoute.js.map