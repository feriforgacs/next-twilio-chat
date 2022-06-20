import { useState, useEffect } from "react";
import { Client } from "@twilio/conversations";

export default function MessageList({ token, identity, conversationSid }) {
	const [client, setClient] = useState();
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [conversation, setConversation] = useState();
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (token) {
			const client = new Client(token);

			client.on("stateChanged", async (state) => {
				if (state === "initialized") {
					setClient(client);

					const conversation = await client.getConversationBySid(conversationSid);
					setConversation(conversation);

					conversation.on("messageAdded", (message) => {
						setMessages((existingMessages) => [message, ...existingMessages]);
					});

					// get existing messages in the conversation
					const messages = await conversation.getMessages();
					setMessages(messages.items);

					// send default message on join
					await conversation.sendMessage(`${identity} joined`);
				}
			});
		}
	}, [token, identity, conversationSid]);

	const sendMessage = async (e) => {
		setLoading(true);
		e.preventDefault();
		await conversation.sendMessage(message);
		setMessage("");
		setLoading(false);
	};

	return (
		<div>
			<h1>Messages</h1>
			<ul>
				{messages.map((message) => (
					<li key={message.state.index}>
						💬 <strong>{message.state.author}</strong>: {message.state.body}
					</li>
				))}
			</ul>
			{client && conversation && (
				<form onSubmit={(e) => sendMessage(e)}>
					<input type={"text"} value={message} onChange={(e) => setMessage(e.target.value)} readOnly={loading} />
					<button type="submit" disabled={loading}>
						{loading ? "Sending" : "Send message"}
					</button>
				</form>
			)}
		</div>
	);
}
