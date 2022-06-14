import { useState, useEffect } from "react";
import { Client } from "@twilio/conversations";

export default function MessageList({ token, identity, conversationSid }) {
	const [client, setClient] = useState();
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (token) {
			const client = new Client(token);

			client.on("stateChanged", async (state) => {
				if (state === "initialized") {
					setClient(client);

					const conversation = await client.getConversationBySid(conversationSid);

					const message = await conversation.sendMessage(`${identity} joined`);

					console.log({ conversation, message });
				}
			});
		}
	}, [token, identity, conversationSid]);

	const sendMessage = async (e) => {
		setLoading(true);
		e.preventDefault();
		setLoading(false);
	};

	return (
		<div>
			<h1>Messages</h1>
			<ul>
				<li>Message 1</li>
				<li>Message 2</li>
				<li>Message 3</li>
			</ul>
			{client && (
				<form onSubmit={(e) => sendMessage(e)}>
					<input type={"text"} value={message} onChange={(e) => setMessage(e.target.value)} />
					<button type="submit" disabled={loading}>
						{loading ? "Sending" : "Send message"}
					</button>
				</form>
			)}
		</div>
	);
}
