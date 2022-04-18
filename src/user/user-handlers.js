import express from 'express';
import { userSchema } from './user-model.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { read, readAll, remove, update } from './user-service.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  if (req.body.email) {
    const user = await read(req.body.email);
    if (!user) return res.status(400).send('User does not exist.');
    return res.send(user);
  }

  const users = await readAll();

  return res.send(users);
});

router.delete('/', validate(userSchema), auth, async (req, res) => {
  const user = await read(req.body.email);
  if (!user) return res.status(400).send('User does not exist.');

  await remove(req.params.email);
  return res.send('User deleted.');
});

router.put('/', validate(userSchema), auth, async (req, res) => {
  const user = await read(req.body.email);
  if (!user) return res.status(400).send('User does not exist.');

  await update(req.params.email, req.body.password);

  return res.send('Password successfully changed.');
});
export default router;
