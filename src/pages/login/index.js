import React from "react";
import { Logo } from "../../assets";
import { Button, Header, Input } from "../../components";

import styles from "./styles.module.css";

const Login = () => {
	return (
		<main className={`${styles.container} container`}>
			<header>
				<Logo />
				<h1>Bitmama</h1>
			</header>
			<div>
				<Header
					headerBig={"Welcome! First things first..."}
					headerSmall={"Login to have access to this amazing app 🔥"}
				/>
				<form>
					<Input labelName={"UserName"} placeHolder={"Steve Jobs"} />
					<Button>Login</Button>
				</form>
			</div>
		</main>
	);
};

export { Login };
