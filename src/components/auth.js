import { useState } from "react";
import { auth, googleProvider } from "../config/firebase.js";
import {
	createUserWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";

export const Auth = () => {
	const signIn = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (err) {
			console.error(err);
		}
	};

	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
		} catch (err) {
			console.error(err);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (err) {
			console.error(err);
		}
	};

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div>
			<input
				placeholder="Email..."
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password..."
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={signIn}>Sign in</button>

			<button onClick={signInWithGoogle}>Sign in with Google</button>

			<button onClick={logout}>Log out</button>
		</div>
	);
};
