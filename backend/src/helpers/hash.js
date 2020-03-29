import bcrypt from 'bcryptjs';

export const hashValue = value =>
    bcrypt.hashSync(value, bcrypt.genSaltSync(8));

export const compareHashedValue = (hashedValue, value) =>
    bcrypt.compareSync(value, hashedValue);
