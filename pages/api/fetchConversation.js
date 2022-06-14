import twilio from "twilio";

export default async function fetchConversationHandler(req, res) {
	const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
	const conversationSID = req.query.sid;
	const conversation = await client.conversations.conversations(conversationSID).fetch();

	return res.status(200).json({ conversation });
}
