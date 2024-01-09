import { ConsoleBlock } from "./types";
import { useBlocksContext } from "../../context/BlocksContext";

const ConsoleText = () => {
	const { blocks } = useBlocksContext();
	const makeTextString = () => blocks.map((line) => line.map((item) => `%c${item.text!.replace(/"/g, '\\"').replace(/ /g, '\\ ')}`).join('')).join('\\n');
	const makeStyleString = () => blocks.map((line) => line.map((item) => `"${styleFormatter(item)}"`).join(',')).join(',');
	const styleFormatter = (item: ConsoleBlock) => item ? `${item.color ? `color: ${item.color};` : ''}${item.bgColor ? `background-color: ${item.bgColor};` : ''}${item.fontWeight ? `font-weight: ${item.fontWeight};` : ''}${item.fontSize ? `font-size: ${item.fontSize}${item.fontSizeUnit || 'rem'};` : ''}` : '';
	const consoleText = () => `console.log("${makeTextString()}",${makeStyleString()})`
	const copy = () => {
		const text = consoleText();
		navigator.clipboard
			.writeText(text)
			.then(() => {
				console.log(text);
			})
		;
	}

	return (
		<div>
			<div>{ consoleText() }</div>
			<button className="w-full bg-zinc-100 rounded-lg" onClick={copy}>Copy</button>
		</div>
	)
}

export default ConsoleText;