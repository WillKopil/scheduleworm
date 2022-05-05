import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import logger from '../config/logger.js';
import AppError from '../config/error.js';

export interface Shift {
  id: number;
  username: string;
  date: string;
  start: string;
  end: boolean;
}

export class Shift extends Model {}

export default Shift.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    start: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    end: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    hooks: {},
  }
);

try {
  await Shift.sync();
  logger.debug('Shift table (re)created.');
} catch (err: any) {
  throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
}

export const shiftSchema = Joi.object({
  shift: Joi.string().min(3).max(25).required(),
});
