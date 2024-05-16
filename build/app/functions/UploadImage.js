"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadMultipleAttachment = exports.uploadImage = exports.upload = exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const __1 = require("..");
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-09-2024
 * PURPOSE/DESCRIPTION  : To determine where to store image and set filename
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : storage
 *****************************************************************/
exports.storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./app/public/images");
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}.png`;
        console.log(file);
        cb(null, filename);
    },
}); // End of storage
exports.upload = (0, multer_1.default)({ storage: exports.storage });
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-09-2024
 * PURPOSE/DESCRIPTION  : To save imagePath in the Database
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : storage
 *****************************************************************/
async function uploadImage(req, res) {
    try {
        const { table, field, data } = req.params, imagePath = req.file.path;
        const storedImage = imagePath.replace("app\\public\\images\\", "");
        if (!req.file)
            return res.status(400).json({ message: __1.Error.noFile });
        await __1.UserModel.uploadImage(table, field, data, storedImage);
        return res.json({ message: __1.Success.ImgUploaded, storedImage });
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.errImgUpdate });
    }
}
exports.uploadImage = uploadImage;
; // End of uploadImage
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 04-08-2024
 * PURPOSE/DESCRIPTION  : To save imagePath in the Database
 * PROGRAMMER           : Joebert L. Cerezo
 * FUNCTION NAME        : uploadMultipleAttachment
 *****************************************************************/
async function uploadMultipleAttachment(req, res) {
    const { table } = req.params, schema = (0, __1.getSchema)(table);
    const { error } = schema.validate(req.body);
    if (schema && error)
        return res.status(400).json({ message: error.details[0].message });
    const imagePath = req.files.map((file) => file.path);
    const storedImage = imagePath.map((image) => image.replace("app\\public\\images\\", ""));
    if (!req.files)
        return res.status(400).json({ message: __1.Error.noFile });
    try {
        for (const file of req.files) {
            const imagePath = file.path;
            const storedImage = imagePath.replace("app\\public\\images\\", "");
            await __1.UserModel.uploadAttachment(table, Object.assign(Object.assign({}, req.body), { Attachment: storedImage }));
        }
        return res.json({ message: __1.Success.ImgUploaded, storedImage });
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.errImgUpdate });
    }
}
exports.uploadMultipleAttachment = uploadMultipleAttachment;
; // End of uploadMultipleAttachment
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 04-17-2024
 * PURPOSE/DESCRIPTION  : To delete image from the file system and database
 * PROGRAMMER           : Joebert L. Cerezo
 * FUNCTION NAME        : deleteImage
 *****************************************************************/
async function deleteImage(req, res) {
    try {
        const { table, field, data } = req.params;
        const attachment = await __1.UserModel.get(table, field, data);
        // Delete image from the file system
        const attachmentPath = `./app/public/images/${attachment[0].Attachment}`;
        if (fs_1.default.existsSync(attachmentPath))
            fs_1.default.unlinkSync(attachmentPath);
        // Delete image path from the database
        await __1.UserModel.delete(table, field, data);
        return res.json({ message: __1.Success.ImageDeleted });
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.errImgDelete });
    }
}
exports.deleteImage = deleteImage;
; // End of deleteImage
//# sourceMappingURL=UploadImage.js.map