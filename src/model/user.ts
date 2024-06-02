import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../types/types.js"

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: [true, "Please enter Your Password"],
        minLength: [8, "Password must be at least 8 characters"],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordOTP: Number,
    resetPasswordOTPExpiry: Date,

}, {
    timestamps: true,
})
userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function (this: IUser) {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET!);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;