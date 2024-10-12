import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Prisma Client
const prisma = new PrismaClient();

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request:', { email, password }); // Debugging log

  try {
    // Find the user in MySQL using Prisma
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      // Compare the password (since you're using plain text for now)
      if (user.password === password) {
        res.status(200).json({ token: 'mockToken123', message: 'Login successful!' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
