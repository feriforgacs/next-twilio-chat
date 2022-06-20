import { useEffect, useState } from "react";
import { Client } from "@twilio/conversations";

export default function useClient({ token, identity, conversationSid }) {
	const [client, setClient] = useState();
	const [conversation, setConversation] = useState();

	useEffect(() => {
		const initClient = async () => {
			const client = new Client(token);

			client.on("stateChanged", async (state) => {
				if (state === "initialized") {
					const conversation = await client.getConversationBySid(conversationSid);
					await conversation.sendMessage(`${identity} joined`);
					setClient(client);
					setConversation(conversation);
				}
			});
		};
		if (token) {
			initClient();
		}
	}, [token, identity, conversationSid]);

	return [client, conversation];
}
