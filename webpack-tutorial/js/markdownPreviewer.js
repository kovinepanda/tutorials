import { markdown } from "markdown";

const attachPreviewer = ($document,sourceId,previewId) => {
    return (event) => {
        const text    = $document.getElementById(sourceId).value,
            preview = $document.getElementById(previewId);

        preview.innerHTML = markdown.toHTML(text);
        event.preventDefault();
    };
}

export default {
    attachPreviewer: attachPreviewer
}