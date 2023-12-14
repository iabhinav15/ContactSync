import mongoose, {Schema} from "mongoose"

const contactSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    name:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        default:""
    },
    email:{
        type: String,
        default:""
    },
    phone:{
        type: String,
        default:""
    },
    position:{
        type: String,
        default:""
    },
    avatar: {
        type: String, // cloudinary url
        default:""
    },
    groupId:{
        type: Number,
        default: 0
    }
    
})

export const Contact = mongoose.model("Contact", contactSchema);