function PathBar(params) {
	const { path } = params;
	const fullPath = path.split('/').filter((pathName) => pathName != '');
	return (
		<div className="bg-neutral-800 font-semibold text-white left-4 right-4 rounded-full fixed top-4 p-2">
			<div className="mx-4 flex gap-2 items-center overflow-hidden">
				<span>
					<i className="text-xl nf nf-fa-home"></i>
				</span>
				{path !== '/' &&
					fullPath.map((pathName, index) => (
						<div key={index} className="flex gap-2 items-center">
							<i className="text-indigo-500 text-sm font-bold nf nf-fa-angle_right"></i>
							<span>{pathName}</span>
						</div>
					))}
			</div>
		</div>
	);
}

export default PathBar;
