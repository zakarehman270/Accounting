import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Components/Main/Main";
import ModalComponent from "./Components/Modal";
import Detail from "./Components/Pages/Details";
import Home from "./Components/Pages/Home";
import Loans from "./Components/Pages/Loans";
import Report from "./Components/Pages/Report";
import Stocks from "./Components/Pages/Stocks";
function App() {
	const [show, setShow] = useState(false);
	const [ModalToggle, setModalToggle] = useState("AddUser");
	const [ModalTitle, setModalTitle] = useState("Add User");
	function HandlerShowModal() {
		setShow(true);
	}
	return (
		<div className="BodyBackgroundColor PageHeight">
			<ModalComponent
				show={show}
				setShow={setShow}
				ModalToggle={ModalToggle}
				ModalTitle={ModalTitle}
			/>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/home" element={<Home />} />
					<Route
						path="/loan"
						element={
							<Loans
								HandlerShowModal={HandlerShowModal}
								setModalToggle={setModalToggle}
								setModalTitle={setModalTitle}
							/>
						}
					/>
					<Route path="/report" element={<Report />} />
					<Route path="/stock" element={<Stocks />} />
					<Route
						path="/detail"
						element={
							<Detail
								HandlerShowModal={HandlerShowModal}
								setModalToggle={setModalToggle}
								setModalTitle={setModalTitle}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
