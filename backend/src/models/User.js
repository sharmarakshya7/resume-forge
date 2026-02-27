import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },

    // Password reset
    resetCode:        { type: String,  default: null },
    resetCodeExpires: { type: Date,    default: null },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare plain password against stored hash
userSchema.methods.matchPassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

// Never return password in JSON responses
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.resetCode;
  delete obj.resetCodeExpires;
  return obj;
};

const User = mongoose.model('User', userSchema);
export default User;
