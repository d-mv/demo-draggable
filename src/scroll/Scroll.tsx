import classes from "./Scroll.module.css";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

// inspired by https://www.youtube.com/watch?v=mbihHtIy67o
export function Scroll() {
	const [y, setY] = useState(0);
	const [originatingY, setOriginatingY] = useState(0);
	const [isDragging, setIsDragging] = useState(false);

	const handleMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
		setIsDragging(true);
		setOriginatingY(e.clientY);
	}, []);

	const handleMouseMove = useCallback(
		({ clientY }: MouseEvent<HTMLDivElement>) => {
			setY((_) => clientY - originatingY);
		},
		[originatingY],
	);
	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	useEffect(() => {
		if (isDragging) {
			// @ts-ignore -- type mismatch
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
		} else {
			// @ts-ignore -- type mismatch
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
			// TODO: reset Y to original?
		}
	}, [handleMouseMove, handleMouseUp, isDragging]);

	return (
		<div className={classes.container}>
			<div className={classes.track}>
				<div
					style={{
						transform: `translateY(${y}px)`,
						cursor: isDragging ? "grabbing" : "grab",
						transition: isDragging ? "none" : "transform 0.2s ease",
						zIndex: isDragging ? 1 : 0,
						position: isDragging ? "absolute" : "relative",
					}}
					className={classes.thumb}
					onMouseDown={handleMouseDown}
				/>
			</div>
		</div>
	);
}
