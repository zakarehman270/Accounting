import React, { createContext, useState } from "react";
import UserEmptyImage from "../Components/Assets/Empty.png";
export const Context = createContext<any>(null);
interface props {
	children: any;
}
export const ContextProvider: React.FC<props> = ({ children }) => {
	const [UserId, setUserId] = useState(0);
	const [UserImage, setUserImage] = useState(UserEmptyImage);
	const [UserPreviousData, setUserPreviousData] = useState({
		name: "",
		contact: 0,
	});

	function handlerHoldUserId(id: number) {
		setUserId(id);
	}
	function handlerUserPreviousData(value: { name: string; contact: number }) {
		setUserPreviousData(value);
	}
	function HandlerUserImage(Image: string) {
		setUserImage(Image);
	}
	return (
		<Context.Provider
			value={{
				handlerHoldUserId,
				UserId,
				handlerUserPreviousData,
				UserPreviousData,
				HandlerUserImage,
				UserImage,
			}}
		>
			{children}
		</Context.Provider>
	);
};
