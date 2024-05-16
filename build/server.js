"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appExpress_1 = __importDefault(require("./appExpress"));
const app_1 = require("./app");
const PORT = process.env.PORT || 3000;
// Connect to the database
(0, app_1.connectToDB)();
// Start server
appExpress_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map