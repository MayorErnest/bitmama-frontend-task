import React from "react";

import styles from "./styles.module.css";

const Input = ({ placeHolder, labelName, extended, error, ...rest }) => {
	return (
		<div
			className={`${styles.container} ${extended ? styles.extended : ""}`}
		>
			<label htmlFor={labelName}>{labelName}</label>
			<div
				className={`${styles["input-box"]} ${
					error.state ? styles.error : ""
				}`}
			>
				{extended ? <span>{extended}</span> : ""}
				<input
					type="text"
					id={labelName}
					placeholder={placeHolder}
					{...rest}
				/>
			</div>
			{error.state ? (
				<span className={styles.error}>{error.message}</span>
			) : (
				""
			)}
		</div>
	);
};

export { Input };
