import "tachyons";
import "../css/style.css";

import markdownPreviewer from "./markdownPreviewer";

window.onload = () => {
    const editor: HTMLElement | null = document.getElementById("editor");
    if (!!editor) {
        editor.addEventListener(
            "submit",
            markdownPreviewer.attachPreviewer(
                document,
                "source",
                "preview",
            ),
        );
    }
};
