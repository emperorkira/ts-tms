"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NotificationRoute_1 = __importDefault(require("./NotificationRoute"));
const RecordRoute_1 = __importDefault(require("./RecordRoute"));
const SelectRoute_1 = __importDefault(require("./SelectRoute"));
const UserRoute_1 = __importDefault(require("./UserRoute"));
const EmailRoute_1 = __importDefault(require("./EmailRoute"));
const AuthRoute_1 = __importDefault(require("./AuthRoute"));
const ReportRoute_1 = __importDefault(require("./ReportRoute"));
const router = express_1.default.Router();
router.use("/", NotificationRoute_1.default);
router.use("/", RecordRoute_1.default);
router.use("/", SelectRoute_1.default);
router.use("/", UserRoute_1.default);
router.use("/", EmailRoute_1.default);
router.use("/", AuthRoute_1.default);
router.use("/", ReportRoute_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map