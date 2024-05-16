"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecord = exports.deleteAllRecord = exports.updateRecord = exports.addMultiplePermissionRecord = exports.addMultipleRecord = exports.addRecordNoCode = exports.addRecord = exports.getRecord = exports.getAllRecord = void 0;
const __1 = require("..");
async function isForeignKeyError(error, table) {
    return (error.originalError &&
        error.code === "EREQUEST" &&
        error.originalError.info.number === 547 &&
        ["Role", "Department", "User", "Product"].includes(table));
}
;
async function getErrorMessage(table, record) {
    switch (table) {
        case "Role":
        case "Department":
            return `${record.Name} is currently in use`;
        case "User":
            return `${record.Username} is currently in use`;
        case "Product":
            return `${record.Name} is currently in use`;
        default:
            return "Error: Unknown table";
    }
}
;
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 02-25-2024
 * PURPOSE/DESCRIPTION  : To get all record in the database dynamically
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getAllRecord
 *****************************************************************/
async function getAllRecord(req, res) {
    try {
        const { table } = req.params;
        const result = await __1.UserModel.getAll(table);
        if (result.length === 0)
            return res.status(404).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.getAllRecord = getAllRecord;
; // End of getAllRecord
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 02-25-2024
 * PURPOSE/DESCRIPTION  : To get specific record in the database dynamically
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getRecord
 *****************************************************************/
async function getRecord(req, res) {
    try {
        const { table, field, data } = req.params;
        const result = await __1.UserModel.get(table, field, data);
        if (table != "DeviceToken") {
            if (!result)
                return res.status(404).json({ message: __1.Error.error404 });
            return res.json(result);
        }
        if (!result)
            return res.status(200).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.getRecord = getRecord;
; // End of getRecord
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-14-2024
 * PURPOSE/DESCRIPTION  : To get add a record in the table
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : addRecord
 *****************************************************************/
async function addRecord(req, res) {
    const { table } = req.params, recordData = req.body, id = null;
    const schema = (0, __1.getSchema)(table), { error } = schema.validate(recordData);
    if (schema && error)
        return res.status(400).json({ message: error.details[0].message });
    const record = await (0, __1.isRecordExist)(table, recordData, id);
    if (record)
        return res.status(500).json({ message: __1.Error.alreadyExist });
    try {
        const newRecordId = await __1.UserModel.create(table, recordData);
        return res.status(201).json({ message: __1.Success.added, Id: newRecordId });
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.addRecord = addRecord;
; // End of addRecord
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 04-14-2024
 * PURPOSE/DESCRIPTION  : To get add a record with no Code in the table
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : addRecordNoCode
 *****************************************************************/
async function addRecordNoCode(req, res) {
    const { table } = req.params, recordData = req.body, id = null;
    const schema = (0, __1.getSchema)(table), { error } = schema.validate(recordData);
    if (schema && error)
        return res.status(400).json({ message: error.details[0].message });
    const record = await (0, __1.isRecordExist)(table, recordData, id);
    if (record)
        return res.status(500).json({ message: __1.Error.alreadyExist });
    try {
        const newRecordId = await __1.UserModel.createNoCode(table, recordData);
        return res.status(201).json({ message: __1.Success.added, Id: newRecordId });
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.addRecordNoCode = addRecordNoCode;
; // End of addRecordNoCode
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 04-21-2024
 * PURPOSE/DESCRIPTION  : To get add multiple record in the table
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : addMultipleRecord
 *****************************************************************/
async function addMultipleRecord(req, res) {
    const { table } = req.params, recordsData = req.body, id = null, newRecordIds = [];
    const schema = (0, __1.getSchema)(table);
    if (schema) {
        for (const recordData of recordsData) {
            const { error } = schema.validate(recordData);
            if (error)
                return res.status(400).json({ message: error.details[0].message });
        }
    }
    try {
        for (const recordData of recordsData) {
            const record = await (0, __1.isRecordExist)(table, recordData, id);
            if (record)
                return res.status(500).json({ message: __1.Error.alreadyExist });
            const newRecordId = await __1.UserModel.create(table, recordData);
            newRecordIds.push(newRecordId);
        }
        return res.status(201).json({ message: __1.Success.added, Id: newRecordIds });
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.addMultipleRecord = addMultipleRecord;
; // End of addMultipleRecord
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 04-14-2024
 * PURPOSE/DESCRIPTION  : To get add a record with no Code in the table
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : addRecordNoCode
 *****************************************************************/
async function addMultiplePermissionRecord(req, res) {
    try {
        const { RoleId, AccessRightIds, CreatedBy, UpdatedBy } = req.body;
        const existingRecords = [], id = null;
        for (const AccessRightId of AccessRightIds) {
            const recordData = { RoleId, AccessRightId, CreatedBy, UpdatedBy };
            const schema = (0, __1.getSchema)("Permission"), { error } = schema.validate(recordData);
            if (schema && error)
                return res.status(400).json({ message: error.details[0].message });
            const recordExists = await (0, __1.isRecordExist)("Permission", recordData, id);
            if (recordExists)
                existingRecords.push(recordExists);
        }
        if (existingRecords.length > 0)
            return res.status(409).json({ message: "Records already exist", existingRecords: existingRecords });
        const newRecordId = await __1.UserModel.addRecordToPermissionTable(RoleId, AccessRightIds, CreatedBy, UpdatedBy);
        return res.status(201).json({ message: "Multiple records added to Permission table successfully.", Id: newRecordId, });
    }
    catch (error) {
        return res.status(500).json({ message: "An error occurred while adding records to Permission table." });
    }
}
exports.addMultiplePermissionRecord = addMultiplePermissionRecord;
; // End of addMultipleRecord
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 02-27-2024
 * PURPOSE/DESCRIPTION  : To update a record in the database
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : updateRecord
 *****************************************************************/
async function updateRecord(req, res) {
    const { table, field, data } = req.params, updatedData = req.body;
    const checkRecord = await (0, __1.isRecordExist)(table, updatedData, data);
    try {
        if (checkRecord)
            return res.status(500).json({ message: __1.Error.alreadyExist });
        const record = await __1.UserModel.get(table, field, data);
        if (record)
            return res.status(404).json({ message: __1.Error.error404 });
        await __1.UserModel.update(table, field, data, updatedData);
        return res.status(200).json({ message: __1.Success.updated });
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.updateRecord = updateRecord;
; // End of updateRecord
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 02-27-2024
 * PURPOSE/DESCRIPTION  : To delete all record in a table
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : deleteAllRecord
 *****************************************************************/
async function deleteAllRecord(req, res) {
    try {
        const { table } = req.params;
        const records = await __1.UserModel.getAll(table), nonDefaultRecords = records.filter((record) => !(0, __1.isDefaultRecord)(table, record.Id));
        if (nonDefaultRecords.length === 0)
            return res.status(404).json({ message: __1.Error.error404 });
        await __1.UserModel.deleteAll(table);
        return res.status(200).json({ message: __1.Success.deleted });
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.deleteAllRecord = deleteAllRecord;
; // End of deleteAllRecord
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 02-27-2024
 * PURPOSE/DESCRIPTION  : To delete specific record in a table
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : deleteRecord
 *****************************************************************/
async function deleteRecord(req, res) {
    const { table, field, data } = req.params;
    let record = null;
    try {
        record = await __1.UserModel.get(table, field, data);
        if (!record)
            return res.status(404).json({ message: __1.Error.error404 });
        if ((0, __1.isDefaultRecord)(table, record.Id))
            return res.status(400).json({ message: __1.Error.errDelDefault });
        await __1.UserModel.delete(table, field, data);
        return res.status(200).json({ message: __1.Success.deleted });
    }
    catch (error) {
        if (!isForeignKeyError(error, table))
            return res.status(500).json({ message: __1.Error.defaultError });
        const errorMessage = getErrorMessage(table, record);
        return res.status(400).json({ message: errorMessage });
    }
}
exports.deleteRecord = deleteRecord;
; // END deleteRecord
//# sourceMappingURL=RecordController.js.map