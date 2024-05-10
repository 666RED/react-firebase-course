import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth.js";
import { db, auth, storage } from "./config/firebase.js";
import {
	getDocs,
	collection,
	addDoc,
	deleteDoc,
	updateDoc,
	doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
	const [movieList, setMovieList] = useState([]);

	// NEW MOVIE STATE
	const [newMovieTitle, setNewMovieTitle] = useState("");
	const [newReleaseDate, setNewReleaseDate] = useState();
	const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

	// UPDATE TITLE STATE
	const [updatedTitle, setUpdatedTitle] = useState("");
	const movieCollectionRef = useMemo(() => collection(db, "movies"));

	// FILE UPLOAD STATE
	const [fileUpload, setFileUpload] = useState(null);

	const getMovieList = async () => {
		try {
			const data = await getDocs(movieCollectionRef);
			const filteredData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setMovieList(filteredData);
		} catch (err) {
			console.error(err);
		}
	};

	// retrieve movie list
	useEffect(() => {
		getMovieList();
	}, []);

	// add new movie
	const onSubmitMovie = async () => {
		try {
			await addDoc(movieCollectionRef, {
				title: newMovieTitle,
				releaseDate: newReleaseDate,
				receivedAnOscar: isNewMovieOscar,
				userId: auth?.currentUser?.uid,
			});
			getMovieList();
		} catch (err) {
			console.error(err);
		}
	};

	// delete movie
	const deleteMovie = async (id) => {
		try {
			const movieDoc = doc(db, "movies", id);
			await deleteDoc(movieDoc);
			getMovieList();
		} catch (err) {
			console.error(err);
		}
	};

	// update movie
	const updateMovieTitle = async (id) => {
		const movieDoc = doc(db, "movies", id);
		await updateDoc(movieDoc, { title: updatedTitle });
		getMovieList();
	};

	// upload file
	const uploadFile = async () => {
		try {
			if (!fileUpload) {
				return;
			}

			const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);

			await uploadBytes(filesFolderRef, fileUpload);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="App">
			<Auth />

			{/* ADD NEW MOVIE */}
			<div>
				<input
					placeholder="Movie title..."
					onChange={(e) => setNewMovieTitle(e.target.value)}
					value={newMovieTitle}
				/>
				<input
					placeholder="Release date..."
					type="number"
					onChange={(e) => setNewReleaseDate(Number(e.target.value))}
					value={newReleaseDate}
				/>
				<input
					type="checkbox"
					checked={isNewMovieOscar}
					onChange={(e) => setIsNewMovieOscar(e.target.checked)}
				/>
				<label>Received an Oscar</label>
				<button onClick={onSubmitMovie}>Submit movie</button>
			</div>

			{/* EXITED MOVIES */}
			<div>
				{movieList.map((movie) => (
					<div>
						<h1>{movie.title}</h1>
						<p>Date: {movie.releaseDate}</p>
						<button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

						<input
							placeholder="new title..."
							onChange={(e) => setUpdatedTitle(e.target.value)}
						/>
						<button onClick={() => updateMovieTitle(movie.id)}>
							Update Title
						</button>
					</div>
				))}
			</div>

			{/* IMAGE & FILE */}
			<input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
			<button onClick={uploadFile}>Upload File</button>
		</div>
	);
}

export default App;
