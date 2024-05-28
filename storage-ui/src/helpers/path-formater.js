function formatPath(path) {
	const fullPath = path.replace('\\', '/');
	const directory = fullPath.split('/').slice(-1);
	return [directory, fullPath];
}

export default formatPath;
