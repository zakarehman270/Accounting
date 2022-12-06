import React from "react";
import Header from "../Header/Header";
import AccountingPic from "../Assets/accountingBackImage.jpg";
const Main = () => {
	return (
		<div>
			<Header />
			<div
				style={{
					backgroundImage: `url(${AccountingPic})`,
					backgroundPosition: "center",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					width: "100%",
					height: "100vh",
				}}
			></div>
		</div>
	);
};

export default Main;
