import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    userRole: {
      type: String,
      enum: ["user", "company"],
      default: "user",
    },
    creditPoints: {
      type: Number,
      required: false,
      default: 0
  }
  },
  {
    timeStamps: true,
  }
);


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(+process.env.SALT_ROUND);
    this.password = await bcrypt.hash(this.password, salt)
})

export default User;
