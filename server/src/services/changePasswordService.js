import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function changePassword(userId, oldPassword, newPassword) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error("Old password is incorrect");

    user.password = newPassword; 
    await user.save(); // hashes password

    return true;
}