import prisma from "../../../prisma/index.js";

class AdminController {
    getAllUsers = async (req, res) => {
        try {
            const users = await prisma.user.findMany();
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Error fetching users' });
        }
    };

    deletUserbyId = async (req, res) => {
        const { userId } = req.params;
        try {
            await prisma.user.delete({
                where: {
                    userId: parseInt(userId),
                },
            });
            res.json({ success: true, message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ success: false, error: 'Error deleting user' });
        }
    }
}
export const adminController = new AdminController();