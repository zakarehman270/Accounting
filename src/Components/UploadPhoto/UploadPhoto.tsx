import React, { useState, useContext } from "react";
import { Context } from "../../Context/Context";
import UserEmptyImage from "../Assets/Empty.png";
import AvatarEditor from "react-avatar-editor";
import { Button } from "react-bootstrap";
import { RiDeleteBinLine } from "@react-icons/all-files/ri/RiDeleteBinLine";
import "./UploadPhoto.css";
import { handlerAddImage } from "../../Common/AddAndRemoveUser/AddEditAndRemoverUser";
export interface Props {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const UploadPhoto: React.FC<Props> = ({ setShow }: Props) => {
	const contextData = useContext(Context);
	const [CheckIfImag, setCheckIfImag] = useState<boolean>(false);
	const [scaleValue, setScaleValue] = useState<number>(1);
	const [selectedImage, setSelectedImage] = useState<string>(UserEmptyImage);
	const [editor, setEditor] = useState<any>(null);
	const onScaleChange = (scaleChangeEvent: any) => {
		const scaleValue = parseFloat(scaleChangeEvent.target.value);
		setScaleValue(scaleValue);
	};
	const selectImage = async (e: any) => {
		setSelectedImage(e.target.files[0]);
		setCheckIfImag(true);
	};
	// function dataURLtoFile(dataurl: string, filename: string) {
	// 	var arr: any = dataurl.split(","),
	// 		mime = arr[0].match(/:(.*?);/)[1],
	// 		bstr = atob(arr[1]),
	// 		n = bstr.length,
	// 		u8arr = new Uint8Array(n);

	// 	while (n--) {
	// 		u8arr[n] = bstr.charCodeAt(n);
	// 	}
	// 	return new File([u8arr], filename, { type: mime });
	// }
	const onCrop = async () => {
		if (editor !== null) {
			const url = editor.getImageScaledToCanvas().toDataURL();
			setCheckIfImag(false);
			setSelectedImage(url);
			contextData.HandlerUserImage(url);
			handlerAddImage(contextData.UserId, url);
			// var file = dataURLtoFile(url, "hello.txt");
			// apiCVBackup
			// 	.cvUploadPhoto(file)
			// 	.then((item) => {
			// 		let value = getLocalStorageValue("ResumeData");
			// 		if (value) {
			// 			value.Resume.ResumeData.Header.HeaderData.ApplicantImage =
			// 				item.data.filePath;
			// 			HandleLocalStorageSetItem("ResumeData", value);
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		console.log("err", err);
			// 	});
		}
	};
	return (
		<div>
			{CheckIfImag ? (
				<div className="text-center">
					<div>
						<AvatarEditor
							scale={scaleValue}
							image={selectedImage}
							width={200}
							height={200}
							border={50}
							ref={(ref: any) => setEditor(ref)}
						/>
						<input
							className="InputTypeRange"
							type="range"
							value={scaleValue}
							name="points"
							min="1"
							max="5"
							step="0.1"
							onChange={onScaleChange}
						/>
					</div>
					<div className="outerWrapperBackButtonsUserUploadPhoto mb-3 d-flex justify-content-center">
						<div
							onClick={() => {
								setCheckIfImag(false);
								setSelectedImage(UserEmptyImage);
								contextData.HandlerUserImage(UserEmptyImage);

								// let value = getLocalStorageValue("ResumeData");
								// if (value) {
								// 	value.ResumeData.Header.HeaderData.ApplicantImage =
								// 		null;
								// 	HandleLocalStorageSetItem("ResumeData", value);
								// }
							}}
							className="backButtonsUserUploadPhoto p-2 c-pointer BorderRadius"
						>
							Back
						</div>
						<div
							onClick={onCrop}
							className="AcceptButtonsUserUploadPhoto p-2 white-color c-pointer BorderRadius"
						>
							Accept
						</div>
					</div>
				</div>
			) : (
				<div>
					<div className="d-flex justify-content-center  pt-3 pb-4">
						<div className="HoverImage outerWrapperUserImage  position-relative">
							<img
								className="UserImage"
								alt={"intro"}
								src={contextData.UserImage}
							/>
							{contextData.UserImage === UserEmptyImage ? (
								<div />
							) : (
								<div
									className="DeleteIconInUploadPhoto 
                      position-absolute 
                      LeftRightTopBottomZero
                       align-items-center justify-content-center"
								>
									<Button
										className="DeleteButton"
										onClick={() => {
											setCheckIfImag(false);
											setSelectedImage(UserEmptyImage);
											contextData.HandlerUserImage(UserEmptyImage);

											// let value = getLocalStorageValue("ResumeData");
											// if (
											// 	value.Resume.ResumeData.Header.HeaderData
											// 		.ApplicantImage
											// ) {
											// 	value.Resume.ResumeData.Header.HeaderData.ApplicantImage =
											// 		null;
											// 	HandleLocalStorageSetItem("ResumeData", value);
											// }
										}}
									>
										<RiDeleteBinLine />
									</Button>
								</div>
							)}
						</div>
					</div>
					<div className="d-flex outerWrapperTextLabelImportPhoto">
						Import Photo
					</div>
					<div>
						<input
							className="DisplayNon"
							type="file"
							id="uploadFile"
							accept="image/png, image/jpeg"
							onChange={(e) => {
								selectImage(e);
								e.target.value = "";
							}}
						/>
						<label
							htmlFor="uploadFile"
							className="outerWrapperFromComputer  c-pointer"
						>
							<div className="fontSize14">From Computer</div>
						</label>
						<div className="outerWrapperOKButtonInUploadPhoto d-flex justify-content-between">
							<div className="outerWrapperButtonColorFacebook c-pointer ">
								<div className="fontSize14">From Facebook</div>
							</div>
							<Button
								className="SubmitButton w-25"
								onClick={() => {
									setShow(false);
									contextData.HandlerUserImage(selectedImage);
								}}
							>
								OK
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default UploadPhoto;
