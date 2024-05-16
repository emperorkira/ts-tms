    import { getRolePermissions, getRoleAccessRights, getAccessRightPermission, Error, SelectModel } from '..';

    /****************************************************************
     * STATUS               : Done
     * DATE CREATED/UPDATED : 03-17-2024
     * PURPOSE/DESCRIPTION  : To get User with Role from SelectModel
     * PROGRAMMER           : Sean Cyril B. Rubio
     * FUNCTION NAME        : getUserLeftRole
     *****************************************************************/
    export async function getUserLeftRole(req:any, res:any) {
        try {
            const { table }:any = req.params;
            const result = await SelectModel.userLeftRole(table);
            if (result.length === 0) return res.status(404).json({ message: Error.error404 });
            return res.json(result);
        } catch (error) {
            res.status(500).json({ message: Error.defaultError });
        }
    }; // End of getUserLeftRole
    
    /****************************************************************
     * STATUS               : Done
     * DATE CREATED/UPDATED : 03-17-2024
     * PURPOSE/DESCRIPTION  : To get User with Role and Department from SelectModel
     * PROGRAMMER           : Sean Cyril B. Rubio
     * FUNCTION NAME        : getUserRoleAndDepartment
     *****************************************************************/
    export async function getUserRoleAndDepartment(req:any, res:any) {
        try {
            const { table, userId }:any = req.params;
            const result = await SelectModel.userRoleAndDepartment(table, userId);
            if (!result) return res.status(404).json({ message: Error.error404 });
            return res.json(result);
        } catch (error) {
            return res.status(500).json({ message: Error.defaultError });
        }
    }; // End of getUserRoleAndDepartment
    
    /****************************************************************
     * STATUS               : Done
     * DATE CREATED/UPDATED : 03-19-2024
     * PURPOSE/DESCRIPTION  : To get Role and Department for AddUser from SelectModel
     * PROGRAMMER           : Sean Cyril B. Rubio
     * FUNCTION NAME        : getSelectRoleDepartment
     *****************************************************************/
    export async function getSelectRoleDepartment(req:any, res:any) {
        try {
            const result = await SelectModel.selectRoleDept();
            if (!result) return res.status(404).json({ message: Error.error404 });
            return res.json(result);
        } catch (error) {
            return res.status(500).json({ message: Error.defaultError });
        }
    }; // End of getSelectRoleDepartment
    
    /****************************************************************
     * STATUS               : Done
     * DATE CREATED/UPDATED : 03-17-2024
     * PURPOSE/DESCRIPTION  : To get Created/UpdatedBy for tables Username from SelectModel
     * PROGRAMMER           : Sean Cyril B. Rubio
     * FUNCTION NAME        : getCreatedUpdatedBy
     *****************************************************************/
    export async function getCreatedUpdatedBy(req:any, res:any) {
        try {
            const { table }:any = req.params;
            const result = await SelectModel.getCreatedUpdatedBy(table);
            if (result.length === 0) return res.status(404).json({ message: Error.error404 });
            return res.json(result);
        } catch (error) {
            return res.status(500).json({ message: Error.defaultError });
        }
    }; // End of getCreatedUpdatedBy
    
    /****************************************************************
     * STATUS               : Done
     * DATE CREATED/UPDATED : 03-28-2024
     * PURPOSE/DESCRIPTION  : to get Ticket, Client, User, Product from SelectModel
     * PROGRAMMER           : Joebert L. Cerezo
     * FUNCTION NAME        : getTicketClientUserProduct
     *****************************************************************/
    export async function getTicketClientUserProduct(req:any, res:any) {
        try {
            const { table } = req.params;
            const result = await SelectModel.selectTicketClientUserProduct(table);
            if (result.length === 0) return res.status(404).json({ message: Error.error404 });
            return res.json(result);
        } catch (error) {
            return res.status(500).json({ message: Error.defaultError });
        }
    }; // End of getTicketClientUserProduct
    
    /****************************************************************
     * STATUS               : Done
     * DATE CREATED/UPDATED : 03-28-2024
     * PURPOSE/DESCRIPTION  : to get single Ticket, Client, User, Product from SelectModel
     * PROGRAMMER           : Joebert L. Cerezo
     * FUNCTION NAME        : getSingleTicketClientUserProduct
     *****************************************************************/
    export async function getSingleTicketClientUserProduct(req:any, res:any) {
        try {
            const { table, ticketId }:any = req.params;
            const result:any = await SelectModel.selectSingleTicketClientUserProduct(table, ticketId);
            if (result.length === 0) return res.status(404).json({ message: Error.error404 });
            return res.json(result);
        } catch (error) {
            return res.status(500).json({ message: Error.defaultError });
        }
    }; // End of getSingleTicketClientUserProduct
    
    /****************************************************************
     * STATUS               : Done
     * DATE CREATED/UPDATED : 04-14-2024
     * PURPOSE/DESCRIPTION  : to get permissions based on RoleId
     * PROGRAMMER           : Sean Cyril B. Rubio
     * FUNCTION NAME        : getPermission
     *****************************************************************/
    export async function getPermission(req:any, res:any) {
        try {
            const { roleId }:any = req.params;
            const result = await getRolePermissions(roleId);
            if (result.length === 0) return res.status(404).json({ message: Error.error404 });
            return res.json(result);
        } catch (error) {
            return res.status(500).json({ message: Error.defaultError });
        }
    }; // End of getPermission
    
    /****************************************************************
     * STATUS               : Done
     * DATE CREATED/UPDATED : 04-14-2024
     * PURPOSE/DESCRIPTION  : to get permissions based on RoleId
     * PROGRAMMER           : Sean Cyril B. Rubio
     * FUNCTION NAME        : getExcludedAccessRights
     *****************************************************************/
    export async function getExcludedAccessRights(req:any, res:any) {
        try {
            const { roleId }:any = req.params;
            const result:any = await getRoleAccessRights(roleId)
            if (result.length === 0) return res.status(404).json({ message: Error.error404 });
            return res.json(result);
        } catch (error) {
            return res.status(500).json({ message: Error.defaultError });
        }
    }; // End of getExcludedAccessRights
    
    /****************************************************************
     * STATUS               : Done
     * DATE CREATED/UPDATED : 04-21-2024
     * PURPOSE/DESCRIPTION  : to get remaining permissions based on RoleId
     * PROGRAMMER           : Jay Mar P. Rebanda
     * FUNCTION NAME        : getRemainingAccessRights
     *****************************************************************/
    export async function getRemainingAccessRights(req:any, res:any) {
        try {
            const {roleId}:any = req.params;
            const result = await getAccessRightPermission(roleId);
            if (result.length === 0) return res.status(404).json({ message: Error.error404 });
            return res.json(result);
        } catch (error) {
            return res.status(500).json({ message: Error.defaultError });
        }
    }; // End of getRemainingAccessRights
