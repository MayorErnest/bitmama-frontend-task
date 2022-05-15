import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../assets";
import { Button, Header, Input } from "../../components";

import styles from "./styles.module.css";

const Login = () => {
	const [userName, setUserName] = useState("");
	const [error, setError] = useState({ state: false, message: "" });

	const navigation = useNavigate();

	const crudeStateUpdate = (newSessionStorage, newLocalStorage) => {
		if (newLocalStorage === undefined) {
			sessionStorage.setItem(
				"currentUser",
				JSON.stringify(newSessionStorage)
			);
		} else {
			sessionStorage.setItem(
				"currentUser",
				JSON.stringify(newSessionStorage)
			);

			localStorage.setItem(
				"userDetails",
				JSON.stringify(newLocalStorage)
			);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (userName === "") {
			setError({ state: true, message: "Invalid username" });
			return;
		}

		const allCurrentUsers =
			JSON?.parse(localStorage?.getItem("userDetails")) ?? [];

		if (allCurrentUsers.length >= 1) {
			if (allCurrentUsers.some((user) => user.userName === userName)) {
				crudeStateUpdate(
					{
						userName: userName,
					},
					{
						userName: userName,
						active: true,
						isCurrentSession: true,
					}
				);

				navigation("/dashboard");

				return;
			}
			crudeStateUpdate(
				{
					userName: userName,
				},
				[
					{
						userName: userName,
						active: true,
						isCurrentSession: true,
					},
					...allCurrentUsers,
				]
			);

			navigation("/dashboard");

			return;
		}

		crudeStateUpdate(
			{
				userName: userName,
			},
			[{ userName: userName, active: true, isCurrentSession: true }]
		);

		navigation("/dashboard");
	};

	// protect route
	useEffect(() => {
		const currentUsersDetails = JSON?.parse(
			localStorage.getItem("userDetails")
		);
		if (currentUsersDetails && currentUsersDetails[0].isCurrentSession) {
			navigation("/dashboard");
		}
	}, [navigation]);

	return (
		<main className={`${styles["page-container"]}`}>
			<div className={`${styles.container} container`}>
				<header>
					<Logo />
					<h1>Bitmama</h1>
				</header>
				<div>
					<Header
						headerBig={"Welcome! First things first..."}
						headerSmall={
							"Login to have access to this amazing app 🔥"
						}
					/>
					<form onSubmit={handleSubmit}>
						<Input
							labelName={"UserName"}
							placeHolder={"Steve Jobs"}
							name="userName"
							value={userName}
							error={error}
							onChange={({ target: { value } }) => {
								setError({ state: false, message: "" });
								setUserName(
									value.split(" ").join("").toLowerCase()
								);
							}}
						/>
						<Button>Login</Button>
					</form>
				</div>
			</div>
		</main>
	);
};

export { Login };
