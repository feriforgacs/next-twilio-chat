import twilio from "twilio";

export default async function addParticipantHandler(req, res) {
	const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

	const { sid, identity } = req.query;

	const participant = await client.conversations.conversations(sid).participants.create({
		identity,
	});

	return res.status(200).json({ participant });
}
