import './styles.css';

function Loader() {
	return (
		<div className="fixed top-0 bottom-0 left-0 right-0 z-10 bg-neutral-950/80">
			<div className="loader after:bg-indigo-950 after:border-indigo-500 after:border-4">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	);
}

export default Loader;
