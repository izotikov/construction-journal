import type { Request, Response, NextFunction } from 'express';
import * as UsersService from './users.service';
import { stripUser } from '../../utils/utils';

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UsersService.getAllUsers();

    res.status(200).json({ message: 'List of all users: ', users});
  } catch(error) {
    next(error)
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  try {
    const user = await UsersService.getUser(id);

    if (!user) {
      res.status(404).json({message: 'User not found'});
      return;
    }

    const safeUser = stripUser(user);

    res.status(200).json({message: 'User found', safeUser});
  } catch(error) {
    next(error)
  }
}

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, name, password } = req.body;

    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }

    if (!name) {
      res.status(400).json({message: 'Username is required'});
      return;
    }

    const user = await UsersService.registerUser(email, name, password);

    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);

    if (!id) {
      res.status(400).json({ message: 'ID is required'});
      return;
    }

    await UsersService.deleteUser(id);

    res.status(200).json({message: `User with id ${id} successfully deleted`});

  } catch (error) {
    next(error);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const {name, email } = req.body;

    if (!id) {
      res.status(400).json({ message: 'ID is required'});
      return;
    }

    if (!name) {
      res.status(400).json({ message: 'Username is required'});
      return;
    }

    if (!email) {
      res.status(400).json({message: 'Email is required'});
      return;
    }

    const updateUser = await UsersService.updateUser(id, email, name);

    res.status(200).json({message: `User updated`, user: updateUser});

  } catch (error) {
    next(error);
  }
}