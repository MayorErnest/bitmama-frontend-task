import React from "react";

import styles from "./styles.module.css";

const Button = ({ children, ...rest }) => {
	return (
		<button className={styles.container} {...rest}>
			{children}
		</button>
	);
};

export { Button };
