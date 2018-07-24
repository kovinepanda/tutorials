import { markdown } from "markdown";

var attachPreviewer = function($document,sourceId,previewId) {
    return function(event) {
        var text = $document.getElementById(sourceId).value,
            preview = $document.getElementById(previewId);
        
        preview.innerHTML = markdown.toHTML(text);
        event.preventDefault();
    };    
}

export default {
    attachPreviewer: attachPreviewer
}