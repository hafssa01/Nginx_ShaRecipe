//This controller defines five methods:
// getAllRecipes, getRecipeById, createRecipe, updateRecipe, and deleteRecipe. 
//Each method uses Prisma to interact with the Recipe model.
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await prisma.user.findMany();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching users' });
        }
    }

    async getUserById(req, res) {
        const id = req.params.id;

        try {
            const user = await prisma.user.findUnique({ where: { id } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user' });
        }
    }
    async createUser(req, res) {
        const { firstName, lastName, email, password, sex, country } = req.body;

        // Validate input
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const user = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password,
                    sex,
                    country,
                },
            });
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error creating user' });
        }
    }

    async updateUser(req, res) {
        const id = req.params.id;
        const { firstName, lastName, email, password, sex, country } = req.body;

        try {
            const user = await prisma.user.update({
                where: { id },
                data: {
                    firstName,
                    lastName,
                    email,
                    password,
                    sex,
                    country,
                },
            });
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error updating user' });
        }
    }

    async deleteUser(req, res) {
        const id = req.params.id;

        try {
            await prisma.user.delete({ where: { id } });
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting user' });
        }
    }
}

export default new UserController();
