import "tachyons";
import "../css/style.css"

import markdownPreviewer from './markdownPreviewer';

window.onload = function() {
    document.getElementById("editor").addEventListener(
        "submit",
        markdownPreviewer.attachPreviewer(
            document,
            "source",
            "preview"
        )
    );
};
