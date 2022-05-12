import React from "react";

import styles from "./styles.module.css";

const Input = ({ placeHolder, labelName, extended, ...rest }) => {
	return (
		<div
			className={`${styles.container} ${extended ? styles.extended : ""}`}
		>
			<label htmlFor={labelName}>{labelName}</label>
			<div className={styles["input-box"]}>
				{extended ? <span>{extended}</span> : ""}
				<input
					type="text"
					id={labelName}
					placeholder={placeHolder}
					{...rest}
				/>
			</div>
		</div>
	);
};

export { Input };
