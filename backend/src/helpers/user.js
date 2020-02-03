import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(8));

export const comparePassword = (hashedPassword, password) =>
    bcrypt.compareSync(password, hashedPassword);

export const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
};

export const generateToken = id =>
    jwt.sign({
            userId: id
        },
        process.env.SECRET, { expiresIn: '7d' }
    );

export const getUserData = ({nickname, email, created_date, modified_date }) => ({
    nickname,
    email,
    created_date,
    modified_date,
});
