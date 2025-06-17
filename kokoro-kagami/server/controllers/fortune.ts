import {Request, Response} from 'express';

export const getFortune = (_req: Request, res: Response) => {
  res.json({message: 'fortune'});
};
