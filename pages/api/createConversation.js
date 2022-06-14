import twilio from "twilio";

export default async function createConversationHandler(req, res) {
	const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
	const conversation = await client.conversations.conversations.create({ friendlyName: `Next Sample Conversation ${Date.now()}` });
	return res.status(200).json({ conversation });
}
