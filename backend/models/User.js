const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    bio:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // no duplicate usernames
        lowercase: true, // auto converts to lowercase
        trim: true 
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // skip if password not modified
    const salt = await bcrypt.genSalt(12); // generate salt (12 rounds)
    this.password = await bcrypt.hash(this.password, salt); // hash + salt
    next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });
// Virtual field to get posts authored by this user
// This assumes you have a Post model that references User

userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author'
});


module.exports = mongoose.model("User", userSchema);
