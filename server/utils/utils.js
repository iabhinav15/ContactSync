import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const hashString = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const compareString = async (password, userPassword)=>{
    return await bcrypt.compare(password, userPassword)
}

export const createJWT = async(userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_Secret, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    return token;
}