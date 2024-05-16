"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = exports.connection = exports.config = void 0;
require("dotenv").config();
const mssql_1 = __importDefault(require("mssql"));
exports.config = {
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
    port: parseInt((_a = process.env.DB_PORT) !== null && _a !== void 0 ? _a : '1433')
};
const connection = async () => {
    try {
        const connect = await mssql_1.default.connect(exports.config);
        console.log("Connected to MSSQL server");
        return connect;
    }
    catch (err) {
        console.error("Error connecting to MSSQL server:", err);
    }
};
exports.connection = connection;
async function connectToDB() {
    try {
        await mssql_1.default.connect(exports.config);
        console.log("Connected to MSSQL server");
    }
    catch (err) {
        console.error("Error connecting to MSSQL server:", err);
    }
}
exports.connectToDB = connectToDB;
;
//# sourceMappingURL=config.js.map