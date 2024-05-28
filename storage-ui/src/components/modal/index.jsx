import { useEffect, useRef, useState } from 'react';

function Modal(args) {
	const { title, action, content, confirmAction } = args;
	const [name, setName] = useState(content);
	const ref = useRef(null);

	useEffect(() => {
		if (ref.current) {
			const regex = /(.*?)\.[^.]+$/;
			const selectName = name.match(regex);

			ref.current.focus();

			if (selectName == null) {
				ref.current.value = name;
				ref.current.selectionStart = 0;
				ref.current.selectionEnd = name.length;
			} else {
				ref.current.value = selectName[0];
				ref.current.selectionStart = 0;
				ref.current.selectionEnd = selectName[1].length;
			}
		}
	}, []);

	return (
		<div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center p-4 text-white z-30 bg-neutral-950/80">
			<div className="max-w-96 w-full gap-4 p-4 flex flex-col bg-neutral-800 rounded-md">
				<div className="flex justify-between items-center">
					<span className="text-indigo-500 font-medium text-lg">{title}</span>
					<i className="nf nf-fa-close cursor-pointer" onClick={() => action(false)}></i>
				</div>
				<input
					className="bg-neutral-900 px-2 py-3 text rounded-md focus-visible:outline-indigo-500 focus-visible:outline focus-visible:outline-2"
					type="text"
					defaultValue={name}
					ref={ref}
					onChange={(event) => setName(event.target.value)}
				/>
				<div className="flex justify-end gap-4">
					<button
						type="button"
						className="bg-neutral-500 rounded-full px-4 py-2"
						onClick={() => action(false)}
					>
						Cancel
					</button>
					<button
						onClick={() => confirmAction(name, action)}
						type="button"
						className="bg-indigo-500 rounded-full px-4 py-2"
					>
						Accept
					</button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
