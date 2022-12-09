import { Request, Response } from "express";
import bcrypt from "bcrypt";
const jwt = require('jsonwebtoken');
const prisma = require("../../prisma/index");

exports.register = async (req: Request, res: Response) => {
  try {
    let { email, name, password } = req.body

    if (!email || !name || !password) {
      throw new Error("Please provide all fields")
    }
    const userPresent = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userPresent) {
      return res
        .status(409)
        .json({ message: 'User with email already exists' });
    }

    password = await bcrypt.hash(password, 12)
    
    const data = await prisma.user.create({
      data: {
        name,
        email,
        password
      },
    })

    return res.status(201).json(
      {
        message: 'User created successfully',
        data
      })

  } catch (error) {
    return res.status(500).json({ message: 'Failed to create user' });
  }

}

exports.login = async (req: Request, res: Response) => {

  try {
    let { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please provide all fields")
    }
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: 'User with email not found' });
    }
    const doMatch = await bcrypt.compare(password, user.password);

    if (!doMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(tokenPayload, process.env.ACCESS_JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).json({ access_token: token })

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.getUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return res.status(200).json({ user })

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}