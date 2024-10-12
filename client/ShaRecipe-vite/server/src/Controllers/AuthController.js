//This controller is or handling authentication-related requests:
//such as login and registration using bcrypt algorithm.

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

class AuthController {
  async register(req, res) {
    const { firstName, lastName, email, password, sex, country } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          name: `${firstName} ${lastName}`,
          email,
          password: hashedPassword,
          sex,
          country,
        },
      });

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' +  error});
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Logged in successfully' });
  }
}

export default new AuthController();
