import mongoose, {Schema} from "mongoose"

const userSchema = new Schema(
    {
        fullName:{
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        email:{
            type: String,
            required: true,
            lowercase:true,
            unique:true,
            true: true,
        },
        password:{
            type: String,
            required: [true, 'Password is required'],
            minLength: [6, 'Minimum length required is 6'],
            select: false
        }
    }
)

export const User = mongoose.model("User", userSchema);