import { changePassword } from "../services/changePasswordService.js";

export async function changePasswordController(req, res) {
    const userId = req.user._id; 
    const { oldPassword, newPassword } = req.body;
    // data sent from client = req.body

    try {
        await changePassword(userId, oldPassword, newPassword);
        res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
