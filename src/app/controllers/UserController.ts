    import { UserModel, Error, Success} from '..';

    /****************************************************************
     * STATUS               : Done
     * DATE CREATED/UPDATED : 03-01-2024
     * PURPOSE/DESCRIPTION  : To update or change password
     * PROGRAMMER           : Sean Cyril B. Rubio
     * FUNCTION NAME        : updatePassword
     *****************************************************************/
    export const updatePassword = async function (req:any, res:any) {
        try {
            const {table, field, idNo}:any = req.params;
            const {Password}:any = req.body;
            await UserModel.updatePass(table, field, idNo, Password);
            return res.status(200).json({ message: Success.passUpdated });
        } catch (error) {
            return res.status(500).json({ message: Error.defaultError });
        }
    }; // End of updatePassword

    /****************************************************************
     * STATUS               : Done
     * DATE CREATED/UPDATED : 03-09-2024
     * PURPOSE/DESCRIPTION  : To get current user logged in
     * PROGRAMMER           : Sean Cyril B. Rubio
     * FUNCTION NAME        : getCurrentUser
     *****************************************************************/
    export const getCurrentUser = async function (req:any, res:any) {
        try {
            const {table}:any = req.params;
            const results:any = await UserModel.getAll(table);
            if (results.length === 0) return res.status(404).json({ message: Error.error404 });
            return res.json(results.filter((result:any) => result.Id === req.UserModel.UserModel.Id)[0]);
        } catch (error) {
            return res.status(500).json({ message: Error.defaultError });
        }
    }; // End of getCurrentUser
