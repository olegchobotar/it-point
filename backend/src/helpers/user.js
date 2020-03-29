import jwt from 'jsonwebtoken';

export const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
};

export const generateToken = id =>
    jwt.sign({
            userId: id
        },
        process.env.SECRET, { expiresIn: '7d' }
    );

export const getUserData = ({id, nickname, email, created_date, modified_date }) => ({
    id,
    nickname,
    email,
    created_date,
    modified_date,
});
