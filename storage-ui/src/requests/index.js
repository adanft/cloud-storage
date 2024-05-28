export function uploadFiles(bodyData, action, path) {
	action(true);

	fetch(`http://${import.meta.env.VITE_API_IP}:5242/file?dir=${path}`, {
		method: 'POST',
		body: bodyData,
	})
		.then((response) => {
			if (response.status === 200) {
				console.log('File saved successfully!!!');
				action(false);
				return;
			}

			if (response.status === 500) {
				throw new Error('Internal Server Error.');
			} else {
				throw new Error(`Unexpected error, status code: ${response.status}`);
			}
		})
		.catch((error) => {
			action(false);
			console.error(error.message);
		});
}

export function deleteFiles(path, action) {
	action(true);

	fetch(`http://${import.meta.env.VITE_API_IP}:5242/file`, {
		method: 'DELETE',
		headers: {
			accept: '*/*',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(path),
	})
		.then((response) => {
			if (response.status === 200) {
				console.log('File deleted successfully!!!');
				action(false);
				return;
			}

			if (response.status === 500) {
				throw new Error('Internal Server Error.');
			} else {
				throw new Error(`Unexpected error, status code: ${response.status}`);
			}
		})
		.catch((error) => {
			action(false);
			console.error(error.message);
		});
}

export function getPathData(action, path) {
	fetch(`http://${import.meta.env.VITE_API_IP}:5242/path?dir=${path}`)
		.then((res) => {
			if (res.status === 200) {
				return res.json();
			}

			if (res.status === 500) {
				throw new Error('Internal Server Error.');
			} else {
				throw new Error(`Unexpected error, status code: ${res.status}`);
			}
		})
		.then((res) => {
			action(res);
		})
		.catch((error) => console.error(error.message));
}

export function createFolders(path, action, action2) {
	action(true);

	fetch(`http://${import.meta.env.VITE_API_IP}:5242/folder`, {
		method: 'POST',
		headers: {
			accept: '*/*',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(path.replace(/\s+/g, '_')),
	})
		.then((response) => {
			if (response.status === 200) {
				console.log('Folder created successfully!!!');
				action(false);
				action2(false);
				return;
			}

			if (response.status === 500) {
				throw new Error('Internal Server Error.');
			} else {
				throw new Error(`Unexpected error, status code: ${response.status}`);
			}
		})
		.catch((error) => {
			action(false);
			action2(false);
			console.error(error.message);
		});
}

export function deleteFolders(path, action) {
	action(true);

	fetch(`http://${import.meta.env.VITE_API_IP}:5242/folder`, {
		method: 'DELETE',
		headers: {
			accept: '*/*',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(path),
	})
		.then((response) => {
			if (response.status === 200) {
				console.log('Folder deleted successfully!!!');
				action(false);
				return;
			}

			if (response.status === 500) {
				throw new Error('Internal Server Error.');
			} else {
				throw new Error(`Unexpected error, status code: ${response.status}`);
			}
		})
		.catch((error) => {
			action(false);
			console.error(error.message);
		});
}
