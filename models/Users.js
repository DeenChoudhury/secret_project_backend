const mongoose = require("../database");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
	{
		first_name:{
			type: String
		},
		last_name:{
			type: String
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type:String
		}
	}
);

UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
	//return password == this.password;
};

User = mongoose.model("User", UserSchema);
module.exports = User;