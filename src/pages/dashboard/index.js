import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../../assets";

import { Button, Header } from "../../components";

import styles from "./styles.module.css";

const Dashboard = () => {
	const [userSessions, setUserSessions] = useState(null);
	const [currentSession, setCurrentSession] = useState(null);

	const navigation = useNavigate();

	const handleIndividualLogout = (userName) => {
		if (userName === currentSession?.userName) {
			handleLogout();
			return;
		}

		setUserSessions(
			userSessions?.filter((user) => user.userName !== userName)
		);

		localStorage.setItem(
			"userDetails",
			JSON.stringify(
				userSessions?.filter((user) => user.userName !== userName)
			)
		);
	};

	const handleLogout = () => {
		sessionStorage.clear();
		localStorage.clear();
		navigation("/");
	};

	const setUsertoIdle = useCallback(() => {
		if (userSessions) {
			const timer = setTimeout(() => {
				localStorage?.setItem(
					"userDetails",
					JSON.stringify([
						{ userName: currentSession?.userName, active: true },
						...userSessions
							?.filter(
								(user) =>
									user.userName !== currentSession?.userName
							)
							.map(({ userName }) => ({
								userName,
								active: false,
							})),
					])
				);
			}, 60000);
			return () => clearTimeout(timer);
		}
	}, [currentSession?.userName, userSessions]);

	// initialize dashboard
	useEffect(() => {
		const allSessions = JSON?.parse(localStorage.getItem("userDetails"));
		const currentUserSession = JSON.parse(
			sessionStorage.getItem("currentUser")
		);
		setUserSessions(allSessions);
		if (currentUserSession) {
			setCurrentSession(currentUserSession);
		} else {
			setCurrentSession(allSessions[0]);
			sessionStorage.setItem(
				"currentUser",
				JSON.stringify(allSessions[0])
			);
		}
	}, []);

	// checkuser has been logged out
	useEffect(() => {
		if (
			userSessions &&
			!userSessions.some(
				(user) => user?.userName === currentSession?.userName
			)
		) {
			navigation("/");
		}
	}, [navigation, currentSession?.userName, userSessions]);

	// set user to inactive after 60 seconds
	useEffect(() => {
		window.addEventListener("focusout", setUsertoIdle());
		return () => {
			window.removeEventListener("focusout", setUsertoIdle());
		};
	}, [setUsertoIdle]);

	return (
		<main className={styles["page-container"]}>
			<div className={`${styles.container} container`}>
				<div className={`${styles.avatar}`}>
					<Avatar />
				</div>
				<Header headerBig={`Welcome: ${currentSession?.userName}`} />
				<div className={styles.table}>
					<ul>
						<li className={`${styles["table-item"]}`}>
							<span>Name</span>
							<span>State</span>
							<span>Action</span>
						</li>
						{userSessions?.length >= 1 ? (
							userSessions.map((session, index) => (
								<li
									className={`${styles["table-item"]}`}
									key={session.userName + index}
								>
									<span>{session.userName}</span>
									<span>
										<span
											className={`${
												session.active !== false
													? styles["active"]
													: styles["in-active"]
											}`}
										></span>
									</span>
									<span>
										<button
											className={`${styles["session-item-logout"]}`}
											onClick={() =>
												handleIndividualLogout(
													session.userName
												)
											}
										>
											Logout
										</button>
									</span>
								</li>
							))
						) : (
							<p>No active session</p>
						)}
					</ul>
				</div>
				<div className={`${styles.buttons}`}>
					<Button onClick={handleLogout}>Sign Out</Button>
					<Button onClick={() => navigation("/")}>
						Sign Into New Account
					</Button>
				</div>
			</div>
		</main>
	);
};

export { Dashboard };
