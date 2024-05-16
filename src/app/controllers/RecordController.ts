import { UserModel, isRecordExist, Error, Success, getSchema, isDefaultRecord } from '..';

async function isForeignKeyError(error: any, table: string): Promise<boolean> {
    return (
        error.originalError &&
        error.code === "EREQUEST" &&
        error.originalError.info.number === 547 &&
        ["Role", "Department", "User", "Product"].includes(table)
    );
};

async function getErrorMessage(table: string, record: any): Promise<string> {
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
};

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 02-25-2024
 * PURPOSE/DESCRIPTION  : To get all record in the database dynamically
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getAllRecord
 *****************************************************************/
export async function getAllRecord(req:any, res:any) {
  try {
    const { table } = req.params;
    const result = await UserModel.getAll(table);
    if (result.length === 0) return res.status(404).json({ message: Error.error404 });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: Error.defaultError });
  }
}; // End of getAllRecord

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 02-25-2024
 * PURPOSE/DESCRIPTION  : To get specific record in the database dynamically
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getRecord
 *****************************************************************/
export async function getRecord(req:any, res:any) {
  try {
    const { table, field, data } = req.params;
    const result = await UserModel.get(table, field, data);
    if (table != "DeviceToken") {
        if (!result) return res.status(404).json({ message: Error.error404 });
        return res.json(result);
    } 
    if (!result) return res.status(200).json({ message: Error.error404 });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: Error.defaultError });
  }
}; // End of getRecord

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-14-2024
 * PURPOSE/DESCRIPTION  : To get add a record in the table
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : addRecord
 *****************************************************************/
export async function addRecord(req:any, res:any) {
    const { table } = req.params, recordData:any = req.body, id:any = null;
    const schema = getSchema(table), { error } = schema.validate(recordData);
    if (schema && error ) return res.status(400).json({ message: error.details[0].message });

    const record = await isRecordExist(table, recordData, id);
    if (record) return res.status(500).json({ message: Error.alreadyExist });
    try {
        const newRecordId = await UserModel.create(table, recordData);
        return res.status(201).json({ message: Success.added, Id: newRecordId });
    } catch (error) {
        return res.status(500).json({ message: Error.defaultError });
    }
}; // End of addRecord

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 04-14-2024
 * PURPOSE/DESCRIPTION  : To get add a record with no Code in the table
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : addRecordNoCode
 *****************************************************************/
export async function addRecordNoCode(req:any, res:any) {
    const { table } = req.params, recordData:any = req.body, id:any = null;
    const schema = getSchema(table), { error } = schema.validate(recordData);
    if (schema && error ) return res.status(400).json({ message: error.details[0].message });

    const record = await isRecordExist(table, recordData, id);
    if (record) return res.status(500).json({ message: Error.alreadyExist });
    try {
        const newRecordId = await UserModel.createNoCode(table, recordData);
        return res.status(201).json({ message: Success.added, Id: newRecordId });
    } catch (error) {
        return res.status(500).json({ message: Error.defaultError });
    }
}; // End of addRecordNoCode

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 04-21-2024
 * PURPOSE/DESCRIPTION  : To get add multiple record in the table
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : addMultipleRecord
 *****************************************************************/
export async function addMultipleRecord(req:any, res:any) {
    const { table } = req.params, recordsData = req.body, id:any = null, newRecordIds:any = [];
    const schema = getSchema(table);
    if (schema) {
        for (const recordData of recordsData) {
            const { error } = schema.validate(recordData);
            if (error) return res.status(400).json({ message: error.details[0].message });
        }
    }

    try {
        for (const recordData of recordsData) {
            const record = await isRecordExist(table, recordData, id);
            if (record)  return res.status(500).json({ message: Error.alreadyExist });
            const newRecordId = await UserModel.create(table, recordData);
            newRecordIds.push(newRecordId);
        }
        return res.status(201).json({ message: Success.added, Id: newRecordIds });
    } catch (error) {
        return res.status(500).json({ message: Error.defaultError });
    }
}; // End of addMultipleRecord

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 04-14-2024
 * PURPOSE/DESCRIPTION  : To get add a record with no Code in the table
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : addRecordNoCode
 *****************************************************************/
export async function addMultiplePermissionRecord(req:any, res:any) {
  try {
    const { RoleId, AccessRightIds, CreatedBy, UpdatedBy } = req.body;
    const existingRecords:any = [], id:any = null;
    for (const AccessRightId of AccessRightIds) {
      const recordData = { RoleId, AccessRightId, CreatedBy, UpdatedBy };
      const schema = getSchema("Permission"), { error } = schema.validate(recordData);
      if (schema && error) return res.status(400).json({ message: error.details[0].message });
      const recordExists = await isRecordExist("Permission", recordData, id);
      if (recordExists) existingRecords.push(recordExists);
    }
    if (existingRecords.length > 0) return res.status(409).json({ message: "Records already exist", existingRecords: existingRecords});
    const newRecordId = await UserModel.addRecordToPermissionTable( RoleId, AccessRightIds, CreatedBy,  UpdatedBy );
    return res.status(201).json({ message: "Multiple records added to Permission table successfully.", Id: newRecordId, });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while adding records to Permission table." });
  }
}; // End of addMultipleRecord

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 02-27-2024
 * PURPOSE/DESCRIPTION  : To update a record in the database
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : updateRecord
 *****************************************************************/
export async function updateRecord(req:any, res:any) {
    const { table, field, data } = req.params, updatedData = req.body;
    const checkRecord = await isRecordExist(table, updatedData, data);
    try {
        if (checkRecord) return res.status(500).json({ message: Error.alreadyExist });
        const record = await UserModel.get(table, field, data);
        if (record) return res.status(404).json({ message: Error.error404 });
        await UserModel.update(table, field, data, updatedData);
        return res.status(200).json({ message: Success.updated });
    } catch (error) {
        return res.status(500).json({ message: Error.defaultError });
    }
}; // End of updateRecord

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 02-27-2024
 * PURPOSE/DESCRIPTION  : To delete all record in a table
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : deleteAllRecord
 *****************************************************************/
export async function deleteAllRecord(req:any, res:any) {
  try {
    const { table } = req.params;
    const records = await UserModel.getAll(table), nonDefaultRecords = records.filter((record:any) => !isDefaultRecord(table, record.Id));
    if (nonDefaultRecords.length === 0) return res.status(404).json({ message: Error.error404 });
    await UserModel.deleteAll(table);
    return res.status(200).json({ message: Success.deleted });
  } catch (error) {
    return res.status(500).json({ message: Error.defaultError });
  }
}; // End of deleteAllRecord

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 02-27-2024
 * PURPOSE/DESCRIPTION  : To delete specific record in a table
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : deleteRecord
 *****************************************************************/

export async function deleteRecord(req:any, res:any) {
    const { table, field, data } = req.params;
    let record:any = null
    try {
        record = await UserModel.get(table, field, data);
        if (!record)  return res.status(404).json({ message: Error.error404 });
        if (isDefaultRecord(table, record.Id)) return res.status(400).json({ message: Error.errDelDefault });
        await UserModel.delete(table, field, data);
        return res.status(200).json({ message: Success.deleted });
    } catch (error) {
        if (!isForeignKeyError(error, table)) return res.status(500).json({ message: Error.defaultError });
        const errorMessage = getErrorMessage(table, record);
        return res.status(400).json({ message: errorMessage });
    }
}; // END deleteRecord