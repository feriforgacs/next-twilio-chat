export default function LogIn({ identity, setIdentity, getToken, loading }) {
	return (
		<section>
			<input type="text" value={identity} onChange={(e) => setIdentity(e.target.value)} />
			<button onClick={(e) => getToken(e)} disabled={loading || !identity}>
				Log in
			</button>
		</section>
	);
}
