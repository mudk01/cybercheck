
import { userService } from "../services/Index";
const { ReturnUserList } = require("../services/UserTable");


const GetAllUsers = (req: any, res : any) => {
    const userList = ReturnUserList();
    return res.json(userList);
}
export const SaveUsers = async (req: any, res : any) => {
    const {name, email} = req.body;
    const result = await userService.SaveUserData(name, email);
    res.send(201).json(result);
}




