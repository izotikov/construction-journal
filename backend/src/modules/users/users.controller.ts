import type { Request, Response, NextFunction } from 'express';
import * as UsersService from './users.service';
import { stripUser } from '../../utils/utils';

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UsersService.findAll();

    res.status(200).json({ message: 'List of all users: ', users});
  } catch(error) {
    next(error)
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const user = await UsersService.findById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ message: 'User found', user: stripUser(user) });
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

    await UsersService.remove(id);

    res.status(200).json({message: `User with id ${id} successfully deleted`});

  } catch (error) {
    next(error);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const { name, email } = req.body;
    if (!id) {
      res.status(400).json({ message: 'ID is required' });
      return;
    }
    if (!name || !email) {
      res.status(400).json({ message: 'Name and email are required' });
      return;
    }
    const user = await UsersService.update(id, { email, name });
    res.status(200).json({ message: 'User updated', user });
  } catch (error) {
    next(error);
  }
}