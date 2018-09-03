import markdownPreviewer from "../src/markdownPreviewer"

const event = {
    preventDefaultCalled: false,
    preventDefault: function() { this.preventDefaultCalled = true; }
};

const source = {
    value: "This is _some markdown_"
};

const preview = {
    innerHTML: ""
};

const document = {
    getElementById: (id) => {
        if (id === "source") {
            return source;
        } else if (id === "preview") {
            return preview;
        } else {
            throw "Don't know how to get " + id;
        }
    }
}

describe("markdownPreviewer", () => {
    describe("attachPreviewer", () => {
        it("renders markdown to the preview element", () => {
            const submitHandler = markdownPreviewer.attachPreviewer(document,
                                                                "source",
                                                                "preview");
            source.value = "This is _some markdown_";

            submitHandler(event);

            expect(preview.innerHTML).toBe("<p>This is <em>some markdown</em></p>");
            expect(event.preventDefaultCalled).toBe(true);
        });
    });
});