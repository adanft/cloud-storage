import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PathBar from './components/path-bar';
import formatPath from './helpers/path-formater';
import Loader from './components/loader';
import { createFolders, deleteFiles, deleteFolders, getPathData, uploadFiles } from './requests';
import Modal from './components/modal';

function Home() {
	const location = useLocation();

	const [data, setData] = useState({
		directories: [],
		files: [],
	});
	const [loader, setLoader] = useState(false);
	const [modalState, setModalState] = useState({ state: false, title: '' });

	function uploadFile(event) {
		const file = event.target.files[0];

		const formData = new FormData();
		formData.append('file', file);

		uploadFiles(formData, setLoader, location.pathname);
	}

	function createFolder(folderPath, action) {
		createFolders(location.pathname + '/' + folderPath, setLoader, action);
	}

	function deleteFolder(folderPath) {
		const confirm = window.confirm('Are you sure to delete the ' + folderPath + ' folder?');
		if (confirm) {
			deleteFolders(location.pathname + '/' + folderPath, setLoader);
		}
	}

	function deleteFile(filePath) {
		const confirm = window.confirm('Are you sure to delete the ' + filePath + ' file?');
		if (confirm) {
			deleteFiles(location.pathname + '/' + filePath, setLoader);
		}
	}

	useEffect(() => {
		if (!loader) {
			getPathData(setData, location.pathname);
		}
	}, [location.pathname, loader]);

	return (
		<>
			<div className="relative px-4">
				<PathBar path={location.pathname} />
				<div className="pt-20 flex flex-col">
					{data.directories.map((directory, index) => {
						const [name, link] = formatPath(directory);
						return (
							<div
								key={index}
								className="flex justify-between pl-4 hover:bg-neutral-700 rounded-full"
							>
								<Link
									className="text-white w-full flex-1 flex items-center gap-3 overflow-hidden"
									to={link}
								>
									<i className="nf nf-fa-folder text-4xl text-indigo-500"></i>
									<span>{name}</span>
								</Link>
								<button
									type="button"
									className="w-11 h-11  hover:bg-neutral-800 rounded-full"
									onClick={() => deleteFolder(name)}
								>
									<i className="nf nf-oct-trash text-2xl text-indigo-500"></i>
								</button>
							</div>
						);
					})}
					{data.files.map((file, index) => {
						const [name] = formatPath(file);
						return (
							<div
								key={index}
								className="flex justify-between pl-4 hover:bg-neutral-700 rounded-full"
							>
								<a
									className="text-white w-full flex-1 flex items-center gap-3 overflow-hidden"
									key={index}
									download={name}
									href={`http://${import.meta.env.VITE_API_IP}:5242/file?dir=${
										location.pathname
									}&name=${name}`}
								>
									<i className="nf nf-fa-file text-4xl text-neutral-500"></i>
									<span>{name}</span>
								</a>
								<button
									type="button"
									className="w-11 h-11  hover:bg-neutral-800 rounded-full"
									onClick={() => deleteFile(name)}
								>
									<i className="nf nf-oct-trash text-2xl text-indigo-500"></i>
								</button>
							</div>
						);
					})}
				</div>
				<button
					onClick={() =>
						setModalState({ ...modalState, state: true, title: 'New folder' })
					}
					className="fixed rounded-full w-12 h-12 bottom-20 right-4 bg-indigo-500 flex justify-center items-center cursor-pointer"
				>
					<i className="nf nf-md-folder_plus text-2xl text-white"></i>
				</button>
				<label className="fixed rounded-full w-12 h-12 bottom-4 right-4 bg-indigo-500 flex justify-center items-center cursor-pointer">
					<input type="file" className="hidden" onChange={(event) => uploadFile(event)} />
					<i className="nf nf-fa-cloud_upload text-3xl text-white"></i>
				</label>
				{loader && <Loader />}
				{modalState.state && (
					<Modal
						title={modalState.title}
						action={(bool) => setModalState({ ...modalState, state: bool })}
						content="Untitled folder"
						confirmAction={createFolder}
					/>
				)}
			</div>
		</>
	);
}

export default Home;
