import React from "react";
import { Avatar } from "../../assets";

import { Button, Header } from "../../components";

import styles from "./styles.module.css";

const Dashboard = () => {
	return (
		<main className={styles["page-container"]}>
			<div className={`${styles.container} container`}>
				<div className={`${styles.avatar}`}>
					<Avatar />
				</div>
				<Header headerBig={`Welcome: ${"Skywalker"}`} />
				<div className={styles.table}>
					<ul>
						<li className={`${styles["table-item"]}`}>
							<span>Name</span>
							<span>State</span>
							<span>Action</span>
						</li>
						<li className={`${styles["table-item"]}`}>
							<span>Anakin Skywalker</span>
							<span>
								<span className={`${styles["active"]}`}></span>
							</span>
							<span>
								<button
									className={`${styles["session-item-logout"]}`}
								>
									Logout
								</button>
							</span>
						</li>
						<li className={`${styles["table-item"]}`}>
							<span>Anakin Skywalker</span>
							<span>
								<span
									className={`${styles["in-active"]}`}
								></span>
							</span>
							<span>
								<button
									className={`${styles["session-item-logout"]}`}
								>
									Logout
								</button>
							</span>
						</li>
					</ul>
				</div>
				<div className={`${styles.buttons}`}>
					<Button>Sign Out</Button>
					<Button>Sign Into New Account</Button>
				</div>
			</div>
		</main>
	);
};

export { Dashboard };
