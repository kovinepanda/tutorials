import markdownPreviewer from "../js/markdownPreviewer";

var event = {
    preventDefaultCalled: false,
    preventDefault: function() {
        this.preventDefaultCalled = true;
    }
};
var source = {
    innerHTML: ""
};

var preview = {
    innerHTML: ""
}

var document = {
    getElementById: function(id) {
        if(id === "source") {
            return source;
        } else if (id === "preview") {
            return preview;
        } else {
            throw "Don't know how to get " + id;
        }
    }
}

describe("markdownPreviewer",function() {
    describe("attachPreviewer", function() {
        it("renders markdown to the preview element", function() {
            var submitHandler = markdownPreviewer.attachPreviewer(document,
                "source",
                "preview");
            
                source.value = "This is _some markdown_";

                submitHandler(event);

                expect(preview.innerHTML).toBe(
                    "<p>This is <em>some markdown</em></p>");
                expect(event.preventDefaultCalled).toBe(true);
        });
    });
});