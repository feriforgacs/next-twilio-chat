export default function LogIn({ identity, setIdentity, getToken, loading }) {
	return (
		<form onSubmit={(e) => getToken(e)}>
			<input type="text" value={identity} onChange={(e) => setIdentity(e.target.value)} />
			<button type="submit" disabled={loading || !identity}>
				Log in
			</button>
		</form>
	);
}
