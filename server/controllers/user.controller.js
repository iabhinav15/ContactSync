import { User } from "../models/user.model.js";
import { compareString, createJWT, hashString } from "../utils/utils.js";


//register user
export const register = async (req, res, next)=>{
    try { 
        const {fullName, email, password} = req.body;
        
        // if(!fullName || !email || !password){
        //     return next("provide all required fields");
        // }
        if( [fullName, email, password].some((val) => (val.trim() === ""))){
            return next(new errorHandler("Provide all the required fields", 400));
        }
        
        const userExist = await User.findOne({email});
        if(userExist){
            return next(new errorHandler("User already exists", 401));
        }
        const hashedPassword = await hashString(password);
        const user = await User.create({
                fullName,
                email,
                password: hashedPassword
        })
        user.password = undefined;
        res.status(201).json({
                success: true,
                user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}


//login user
export const login = async (req, res, next)=>{
    const {email, password} = req.body;

    try {
        if(!email || !password){
            return next(new errorHandler("All  fields are required", 400));
        }
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return next(new errorHandler("All  fields are required", 401));
        }

        const isMatch = await compareString(password, user.password);
        if(!isMatch){
            return next(new errorHandler("Invalid credentials", 401));

        }
        user.password = undefined;

        const token = await createJWT(user._id);

        res.status(200).json({
            success: true,
            user,
            token
        })

    } catch (error) {
        res.status(404).json({ 
            success: false,
            error: error.message 
        });
        
    }
}