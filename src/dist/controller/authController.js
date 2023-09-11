"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeAccountPassword = exports.resetAccountPassword = exports.verifiedAccount = exports.signInAccount = exports.deleteAccount = exports.updateAccountAvatar = exports.updateAccountInfo = exports.registerDispacherAccount = exports.registerAccount = exports.viewAccount = exports.viewAccounts = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const email_1 = require("../utils/email");
const roles_1 = require("../utils/roles");
const uploadHelper_1 = require("../utils/uploadHelper");
const prisma = new client_1.PrismaClient();
const viewAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.authModel.findMany({});
        console.log("reading");
        return res.status(200).json({
            message: "Accounts found",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error viewing Accounts",
            data: error,
        });
    }
});
exports.viewAccounts = viewAccounts;
const viewAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield prisma.authModel.findUnique({
            where: { id: userID },
        });
        return res.status(200).json({
            message: "Account found",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error viewing single Account",
        });
    }
});
exports.viewAccount = viewAccount;
const registerAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const value = crypto_1.default.randomBytes(16).toString("hex");
        const token = jsonwebtoken_1.default.sign(value, "justRand");
        const user = yield prisma.authModel.create({
            data: {
                userName,
                email,
                password: hashed,
                token,
                role: roles_1.role.USER,
            },
        });
        const tokenID = jsonwebtoken_1.default.sign({ id: user.id }, "justRand");
        (0, email_1.sendAccountOpeningMail)(user, tokenID);
        return res.status(201).json({
            message: "Account created",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating Account",
        });
    }
});
exports.registerAccount = registerAccount;
const registerDispacherAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password, dispatchID } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const value = crypto_1.default.randomBytes(16).toString("hex");
        const token = jsonwebtoken_1.default.sign(value, "justRand");
        const sreachData = [
            {
                id: 1,
            },
            {
                id: 2,
            },
            {
                id: 3,
            },
            {
                id: 4,
            },
        ];
        const findDispatcher = sreachData.some((el) => el.id === dispatchID);
        if (findDispatcher) {
            const user = yield prisma.authModel.create({
                data: {
                    userName,
                    email,
                    password: hashed,
                    token,
                    role: roles_1.role.DISPATCHER,
                },
            });
            const tokenID = jsonwebtoken_1.default.sign({ id: user.id }, "justRand");
            (0, email_1.sendAccountOpeningMail)(user, tokenID);
            return res.status(201).json({
                message: "Account created",
                data: user,
            });
        }
        else {
            return res.status(404).json({
                message: "Please check your Dispatcher ID",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating Account",
        });
    }
});
exports.registerDispacherAccount = registerDispacherAccount;
const updateAccountInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { userName } = req.body;
        const user = yield prisma.authModel.update({
            where: { id: userID },
            data: { userName },
        });
        return res.status(201).json({
            message: "Account updated",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error updating Account",
        });
    }
});
exports.updateAccountInfo = updateAccountInfo;
const updateAccountAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        // const { secure_url, public_id } = await cloudinary.uploader.upload(
        //   req.file.path
        // );
        const { secure_url, public_id } = yield (0, uploadHelper_1.streamUpload)(req);
        const user = yield prisma.authModel.update({
            where: { id: userID },
            data: { avatar: secure_url, avatarID: public_id },
        });
        return res.status(201).json({
            message: "Account updated",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error updating Account",
        });
    }
});
exports.updateAccountAvatar = updateAccountAvatar;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        yield prisma.authModel.delete({
            where: { id: userID },
            include: { store: true },
        });
        return res.status(201).json({
            message: "Account deleted",
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error deleting Account",
            data: error,
        });
    }
});
exports.deleteAccount = deleteAccount;
const signInAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma.authModel.findUnique({
            where: { email },
        });
        if (user) {
            const check = yield bcrypt_1.default.compare(password, user.password);
            if (check) {
                if (user.verified && user.token !== "") {
                    const token = jsonwebtoken_1.default.sign({
                        id: user.id,
                    }, "secret", { expiresIn: "3d" });
                    return res.status(201).json({
                        message: `Welcome back ${user.userName}`,
                        user: token,
                    });
                }
                else {
                    return res.status(404).json({
                        message: "Please go and verify your account",
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: "incorrect password",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "can't find user",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error deleting Account",
        });
    }
});
exports.signInAccount = signInAccount;
const verifiedAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const getID = jsonwebtoken_1.default.verify(token, "justRand", (err, payload) => {
            if (err) {
                return err;
            }
            else {
                return payload;
            }
        });
        const user = yield prisma.authModel.update({
            where: { id: getID.id },
            data: {
                verified: true,
                token: "",
            },
        });
        return res.status(201).json({
            message: "Account verified",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error verifying Account",
        });
    }
});
exports.verifiedAccount = verifiedAccount;
const resetAccountPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield prisma.authModel.findUnique({
            where: { email },
        });
        if ((user === null || user === void 0 ? void 0 : user.verified) && user.token === "") {
            const token = jsonwebtoken_1.default.sign({ id: user.id }, "justRand");
            yield prisma.authModel.update({
                where: { id: user.id },
                data: {
                    token,
                },
            });
            (0, email_1.resetAccountPasswordMail)(user, token);
            return res.status(201).json({
                message: "You can now change your Password",
                data: token,
            });
        }
        else {
            return res.status(404).json({
                message: "can't reset this password",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error verifying Account",
        });
    }
});
exports.resetAccountPassword = resetAccountPassword;
const changeAccountPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const getID = jsonwebtoken_1.default.verify(token, "justRand", (err, payload) => {
            if (err) {
                return err;
            }
            else {
                return payload.id;
            }
        });
        const user = yield prisma.authModel.findUnique({
            where: { id: getID },
        });
        if ((user === null || user === void 0 ? void 0 : user.verified) && user.token !== "") {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashed = yield bcrypt_1.default.hash(password, salt);
            yield prisma.authModel.update({
                where: { id: user.id },
                data: {
                    password: hashed,
                },
            });
            return res.status(201).json({
                message: "Your password has been changed",
            });
        }
        else {
            return res.status(404).json({
                message: "can't reset this password",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error verifying Account",
        });
    }
});
exports.changeAccountPassword = changeAccountPassword;
