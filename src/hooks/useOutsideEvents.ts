import { useEffect } from "react";

export function useOutsideEvents(ref: any, handleClick: () => void) {
	useEffect(() => {
		/**
		 * Invoke Function onClick outside of element
		 */
		function handleClickOutside(event: any) {
			if (ref.current && !ref.current.contains(event.target)) {
				handleClick();
			}
		}

		function handleEscapeKey(event: KeyboardEvent) {
			if (event.key === "Escape") {
				handleClick();
			}
		}
		// Bind
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscapeKey);

		return () => {
			// dispose
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [ref, handleClick]);
}
