import * as tables from '..'
import { Error }from '..'
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 02-28-2024
 * PURPOSE/DESCRIPTION  : To Handle schema of table, field, data dynamically
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getSchema
 *****************************************************************/
export function getSchema(table:any) {
  try {
    let t:any = tables, s:any = `${table}Schema`;
    return t.s;
  } catch (error) {
    console.error(Error.schemaNotFound, table);
    return null;
  }
} // End of getSchema
