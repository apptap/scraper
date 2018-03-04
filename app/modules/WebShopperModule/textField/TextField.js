define(function() {
    function TextField(elem, numChars, numWords) {
        this.jqObject  = $(elem);
        this.top       = this.jqObject.position().top;
        this.left      = this.jqObject.position().left;
        this.fontSize  = this.jqObject.css('font-size').split("px")[0];
        this.numChars     = numChars;
        this.numWords     = numWords;
        this.fieldName = null;
        this.that      = this;
    }

    TextField.prototype = {
        mark: function() {
            this.jqObject[0].style.outline = 'orange dashed 2px';
        }
    }

    return TextField;
});

