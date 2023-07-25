import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom";

function SignupFormModal() {
	const history = useHistory()
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [image, setImage] = useState("");
	const [errors, setErrors] = useState([]);
	const [validationErrors, setValidationErrors] = useState([])
	const { closeModal } = useModal();
	const [hasSubmitted, setHasSubmitted] = useState(false)
    const [disabled, setDisabled]= useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault();
		setHasSubmitted(true)
		if (Object.values(validationErrors).length) return

		if (password === confirmPassword) {

			const formData = new FormData();
			formData.append("username", username);
			formData.append("email", email);
			formData.append("password", password);
			formData.append("image", image);

			const data = await dispatch(signUp(formData));
			if (data) {
				setErrors(data);
			} else {
				history.push('/feed')
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	useEffect(()=>{
        const errors = {}
        if(email.length < 5 || email.length >=25 || !(email.includes("@"))) errors['email']="Please provide a valid email address between 5 and 50 characters"
        if(username.length < 5 || username.length >= 25) errors['username']="Please provide a username between 5 and 25 characters"
		if(password.length < 8 || password.length >=25) errors['password']="Please provide a password between 8 and 25 characters"
		if(confirmPassword !== password) errors['confirmPassword']="Confirm Password field must be the same as the Password field"
        setValidationErrors(errors)
    }, [email, username, password, confirmPassword])

    const errorLength = Object.values(validationErrors).length

    useEffect(()=>{
    //     console.log(hasSubmitted)
        errorLength  && hasSubmitted ? setDisabled(true): setDisabled(false)
    },[errorLength, hasSubmitted])

	return (
		<>
		<div id="signup-modal-wrapper">
			<h1>Sign Up</h1>
				<form onSubmit={handleSubmit}>
				<div id="signup-form-wrapper">
					{/* <ul>
						{errors.map((error, idx) => (
							<li className="errors-info" key={idx}>{error}</li>
						))}
					</ul> */}
						{hasSubmitted && validationErrors.email && (
							<div >
								<p className="errors-info" >{validationErrors.email}</p>
							</div>
						)}
					<label>
						<input
							className="input-field"
							placeholder="Email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
						{hasSubmitted && validationErrors.username && (
							<div >
								<p className="errors-info">{validationErrors.username}</p>
							</div>
						)}
					<label>
						<input
							className="input-field"
							placeholder="Username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
						{hasSubmitted && validationErrors.password && (
							<div >
								<p className="errors-info">{validationErrors.password}</p>
							</div>
						)}
					<label>

						<input
							className="input-field"
							placeholder="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
						{hasSubmitted && validationErrors.confirmPassword && (
							<div >
								<p className="errors-info">{validationErrors.confirmPassword}</p>
							</div>
						)}
					<label>
						<input
							className="input-field"
							placeholder="Confirm Password"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
					{/* enctype="multipart/form-data" */}
					<br/>
					<label>
						<h3>Choose a profile picture</h3>
						<input
							className="input-field"
							label="Upload Avatar"
							type="file"
							value={image}
							onChange={(e) => setImage(e.target.files[0])}
							required
							enctype="multipart/form-data"
						/>
					</label>
					<div id="signup-button-wrapper">
						<button disabled={disabled} id={disabled? "disabled": null} type="submit">Sign Up</button>
					</div>
				</div>
				</form>
		</div>
		</>
	);
}

export default SignupFormModal;
