    import multer from 'multer';
    import fs from 'fs';
    import { UserModel, getSchema, Error, Success } from '..';

    /****************************************************************
     * STATUS               : Done
     * DATE CREATED/UPDATED : 03-09-2024
     * PURPOSE/DESCRIPTION  : To determine where to store image and set filename
     * PROGRAMMER           : Sean Cyril B. Rubio
     * FUNCTION NAME        : storage
     *****************************************************************/
    export const storage = multer.diskStorage({
        destination: function (req:any, file:any, cb:any) {
            cb(null, "./app/public/images");
        },
        filename: function (req, file, cb) {
            const filename = `${Date.now()}.png`;
            console.log(file);
            cb(null, filename);
        },
    }); // End of storage

    export const upload = multer({ storage: storage });

    /****************************************************************
     * STATUS               : Done
     * DATE CREATED/UPDATED : 03-09-2024
     * PURPOSE/DESCRIPTION  : To save imagePath in the Database
     * PROGRAMMER           : Sean Cyril B. Rubio
     * FUNCTION NAME        : storage
     *****************************************************************/
    export async function uploadImage(req:any, res:any) {
        try {
            const { table, field, data } = req.params, imagePath = req.file.path;
            const storedImage = imagePath.replace("app\\public\\images\\", "");
            if (!req.file) return res.status(400).json({ message: Error.noFile });
            await UserModel.uploadImage(table, field, data, storedImage);
            return res.json({ message: Success.ImgUploaded, storedImage });
        } catch (error) {
            return res.status(500).json({ message: Error.errImgUpdate });
        }
    }; // End of uploadImage

    /****************************************************************
     * STATUS               : Done
     * DATE CREATED/UPDATED : 04-08-2024
     * PURPOSE/DESCRIPTION  : To save imagePath in the Database
     * PROGRAMMER           : Joebert L. Cerezo
     * FUNCTION NAME        : uploadMultipleAttachment
     *****************************************************************/
    export async function uploadMultipleAttachment(req:any, res:any) {
        const { table } = req.params, schema = getSchema(table);
        const { error } = schema.validate(req.body);
        if (schema && error) return res.status(400).json({ message: error.details[0].message });

        const imagePath = req.files.map((file:any) => file.path);
        const storedImage = imagePath.map((image:any) => image.replace("app\\public\\images\\", "") );

        if (!req.files) return res.status(400).json({ message: Error.noFile });
        try {
            for (const file of req.files) {
                const imagePath = file.path;
                const storedImage = imagePath.replace("app\\public\\images\\", "");
                await UserModel.uploadAttachment(table, { ...req.body, Attachment: storedImage});
            }
            return res.json({ message: Success.ImgUploaded, storedImage });
        } catch (error) {
            return res.status(500).json({ message: Error.errImgUpdate });
        }
    }; // End of uploadMultipleAttachment

    /****************************************************************
     * STATUS               : Done
     * DATE CREATED/UPDATED : 04-17-2024
     * PURPOSE/DESCRIPTION  : To delete image from the file system and database
     * PROGRAMMER           : Joebert L. Cerezo
     * FUNCTION NAME        : deleteImage
     *****************************************************************/
    export async function deleteImage(req:any, res:any) {
        try {
            const { table, field, data } = req.params;
            const attachment = await UserModel.get(table, field, data);

            // Delete image from the file system
            const attachmentPath = `./app/public/images/${attachment[0].Attachment}`;
            if (fs.existsSync(attachmentPath)) fs.unlinkSync(attachmentPath);
            // Delete image path from the database
            await UserModel.delete(table, field, data);
            return res.json({ message: Success.ImageDeleted });
        } catch (error) {
            return res.status(500).json({ message: Error.errImgDelete });
        }
    }; // End of deleteImage
