import { User } from "../models/User.js";
import { Webhook } from "svix";

const clerkWebkooks = async (req, res) => {
	try {
		const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

		//Getting Headers
		const headers = {
			"svix-id": req.headers["svix-id"],
			"svix-timestamp": req.headers["svix-timestamp"],
			"svix-signature": req.headers["svix-signature"],
		};

		//verify header
		await whook.verify(JSON.stringify(req.body), headers);

		//getting data from request body
		const { data, type } = req.body;

		const userData = {
			_id: data.id,
			email: data.email_addresses[0].email_address,
			username: data.first_name + " " + data.last_name,
			image: data.image_url,
		};

		//switch case for different Events
		switch (type) {
			case "user.created": {
				await User.create("Created User", userData);
				console.log(userData);
				break;
			}
			case "user.updated": {
				console.log("updated user", userData);
				await User.findByIdAndUpdate(data.id, userData);
				break;
			}
			case "user.deleted": {
				console.log("deleted User", userData);
				await User.findByIdAndDelete(data.id);
				break;
			}
			default:
				break;
		}
		res.json({ success: true, message: "Webhook Recieved" });
	} catch (error) {
		console.log(error.message);
		res.json({ success: false, message: error.message });
	}
};

export default clerkWebkooks;
