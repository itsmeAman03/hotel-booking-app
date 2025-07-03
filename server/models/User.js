import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		_id: { type: mongoose.Schema.Types.String, required: true },
		username: { type: mongoose.Schema.Types.String, required: true },
		email: { type: mongoose.Schema.Types.String, required: true },
		image: { type: mongoose.Schema.Types.String, required: true },
		role: { type: mongoose.Schema.Types.String, enum: ["user", "hotelOwner"], default: "user" },
		recentSearchedCities: [{ type: mongoose.Schema.Types.String, require: true }],
	},
	{ timestamps: true }
);

export const User = mongoose.model("User", userSchema);

