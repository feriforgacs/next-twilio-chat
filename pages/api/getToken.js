import twilio from "twilio";

export default async function getTokenHandler(req, res) {
	const { sid, identity } = req.query;

	const accessToken = new twilio.jwt.AccessToken(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET);
	const chatGrant = new twilio.jwt.AccessToken.ChatGrant({
		serviceSid: sid,
	});

	accessToken.addGrant(chatGrant);
	accessToken.identity = identity;

	return res.status(200).json({ token: accessToken.toJwt(), identity });
}
