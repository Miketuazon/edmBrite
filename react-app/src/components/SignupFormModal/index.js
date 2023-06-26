import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [hasSubmitted, setHasSubmitted] = useState(false)
	const { closeModal } = useModal();

	useEffect(() => {
		let e = {}
		setErrors(e)


		if (!email.includes("@")) e.email = ('Email is required and needs an @ to be accepted')
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) e.email = ('Please input an actual Email')
	}, [email])

	const handleSubmit = async (e) => {
		e.preventDefault();
		setHasSubmitted(true)
		if (Object.keys(errors).length !== 0) return
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup">
			<div className="signUpPhotoContainer">
				<img className="signUpPhoto" src="https://edmhousenetwork.com/wp-content/uploads/2022/03/edc.jpg">
				</img>
			</div>
			<h1 className="login-head">Sign Up</h1>
			<form onSubmit={handleSubmit}>
					<ul>
						{hasSubmitted && Object.values(errors).map((error, idx) => (
							<li style={{ color: "red", backgroundColor: "yellow" }} key={idx}>{error}</li>
						))}
					</ul>
				<section className="email-username">
					<label>
						Email
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
					<label>
						Username
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
				</section>
				<section className="passwords">
					<label>
						Password
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
					<label>
						Confirm Password
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
				</section>
				<div className="submit-container">
					<button type="submit">Sign Up</button>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
