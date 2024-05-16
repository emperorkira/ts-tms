require("dotenv").config();
import sql from 'mssql';

export const config: any = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        trustedconnection: true,
        enableArithAbort: true,
        instancename: "localhost",
        encrypt: true,
        trustServerCertificate: true,
    },
    port: parseInt(process.env.DB_PORT ?? '1433')
};

export const connection: any = async () => {
    try {
        const connect= await sql.connect(config);
        console.log("Connected to MSSQL server");
        return connect
    } catch (err) {
        console.error("Error connecting to MSSQL server:", err);
    }
};

export async function connectToDB() {
    try {
      await sql.connect(config);
      console.log("Connected to MSSQL server");
    } catch (err) {
      console.error("Error connecting to MSSQL server:", err);
    }
};
  