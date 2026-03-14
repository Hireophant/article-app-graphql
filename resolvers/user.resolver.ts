import User from "../models/user.model";
import md5 from "md5";
import { generateRandomString } from "../helpers/generate";



export const resolversUser = {
    Query: {
        getUser: async (_, args, context) => {
            //const { id } = args;
            
            const infoUser = await User.findOne({ token: context["user"].token, deleted: false });
            if (infoUser) {
                return {
                    code: 200,
                    message: "Thành công!",
                    id: infoUser.id,
                    fullName: infoUser.fullName,
                    email: infoUser.email,
                    token: infoUser.token
                };
            }
            return {
                code: 400,
                message: "Không tìm thấy thông tin người dùng!"
            };
        },
    },
    Mutation: {
        registerUser: async (_, args) => {
            const { user } = args;

            const emailExist = await User.findOne({
                email: user.email,
                deleted: false,
            });

            if (emailExist) {
                return {
                    code: 400,
                    message: "Email đã tồn tại!"
                };
            } else {
                user.password = md5(user.password);
                user.token = generateRandomString(30);

                const newUser = new User(user);
                const data = await newUser.save();

                return {
                    code: 200,
                    message: "Thành công!",
                    id: data.id,
                    fullName: data.fullName,
                    email: data.email,
                    token: data.token
                };
            }
        },
        loginUser: async (_, args) => {
            const {email, password} = args.user;
            const infoUser = await User.findOne({
                email: email,
                deleted: false,
            });
            if (!infoUser) {
                return {
                    code: 400,
                    message: "Email không tồn tại!"
                };
            }
            if (infoUser.password !== md5(password)) {
                return {
                    code: 400,
                    message: "Sai mật khẩu!"
                };
            }
            return {
                code: 200,
                message: "Đăng nhập thành công!",
                id: infoUser.id,
                fullName: infoUser.fullName,
                email: infoUser.email,
                token: infoUser.token
            };
        },
        deleteUser: async (_: any, args) => {
            const { id } = args;
            await User.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() });
            return "Delete user successfully";
        },
        updateUser: async (_: any, args) => {
            const { id, user } = args;
            await User.updateOne({ _id: id, deleted: false }, user);
            const record = await User.findOne({ _id: id });
            return record;
        },
    },
};