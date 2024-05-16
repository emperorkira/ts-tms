
export const defaultRecords:any = {
  User: [1],
  Role: [1],
  Department: [1],
  Product: [1, 2, 3],
  AccessRight: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20 ,21 ,22, 23, 24,
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60
  ],
};

export function isDefaultRecord(table:any, id:any) {
  return defaultRecords[table] && defaultRecords[table].includes(id);
};
