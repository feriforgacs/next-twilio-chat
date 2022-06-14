import { useState } from "react";
import axios from "axios";
import LogIn from "../components/logIn";
import MessageList from "../components/MessageList";

export default function Home() {
	const [identity, setIdentity] = useState("");
	const [token, setToken] = useState();
	const [loading, setLoading] = useState(false);

	const getToken = async (e) => {
		e.preventDefault();
		setLoading(true);
		// create new conversation
		const conversation = await axios.get("/api/createConversation");
		const sid = conversation.data.conversation.sid;

		// add participant to conversation
		const participant = await axios.get(`/api/addParticipant?sid=${sid}&identity=${identity}`);

		// get token for participant
		const token = await axios.get(`/api/getToken?sid=${sid}&identity=${identity}`);
		setToken(token);

		setLoading(false);
	};

	return (
		<main>
			<h1>Next.js - Twilio Conversations</h1>
			{!token && <LogIn identity={identity} setIdentity={setIdentity} getToken={getToken} loading={loading} />}
			{token && <MessageList token={token} />}
		</main>
	);
}
