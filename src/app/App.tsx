import classes from "./App.module.css";
import { Content } from "src/content";
import { Scroll } from "src/scroll";

export function App() {
	return (
		<div className={classes.container}>
			<h1 className={classes.header}>Demo: Draggable</h1>
			<Content />
			<Scroll />
		</div>
	);
}
