/**
 * bootform.js [master branch]
 *
 */

(function (root, factory) {

    "use strict";
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["jquery"], factory);
    } else if (typeof exports === "object") {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require("jquery"));
    } else {
        // Browser globals (root is window)
        root.bootform = factory(root.jQuery);
    }

}(this, function init($, undefined) {

    "use strict";

    // the base DOM structure needed to create a modal
    var templates = {
        form:
            "<form class='form form-horizontal'></form>",
        inputs: {
            formgroup:
                "<div class='form-group'><div class='form-group-inner'></div></div>",
            label:
                "<label class='control-label'></label>",
            text:
                "<input class='form-control'  type=text />",
            textarea:
                "<textarea class='form-control'></textarea>",
            email:
                "<input class='form-control'  type='email' />",
            select:
                "<select class='form-control'></select>",
            option: "<option value=''></option>",
            checkbox:
                "<div class='checkbox'><label><input class='form-control' type='checkbox' /></label></div>",
            date:
                "<input class=' form-control'  type='date' />",
            time:
                "<input class=' form-control'  type='time' />",
            number:
                "<input class=' form-control'  type='number' />",
            password:
                "<input class=' form-control'  type='password' />"
        }
    };

    var defaults = {
        labelColumns: 2,
    };

    // our public object; augmented after our private API
    var exports = {};

    function sanitize(options) {
        if (typeof options !== "object") {
            throw new Error("Please supply an object of options");
        }

        options = $.extend({}, defaults, options);

        if ( ! options.field )
            throw new Error("Must include a name");

        if ( ! options.label )
            throw new Error("Must include a label");

        return options;
    }

    function getGroup(options) {
        var $group = $(templates.inputs.formgroup);
        var $label = $(templates.inputs.label);

        var inputColumns = 12 - options.labelColumns;
        $label.addClass('col-sm-'+options.labelColumns);
        $group.find('.form-group-inner').addClass('col-sm-'+inputColumns);
        $label.html(options.label);
        $group.prepend($label);

        return $group;
    }

    exports.text = function(options) {
        options = sanitize(options);

        var $group = getGroup(options);

        var $input = $(templates.inputs.text);

        if (options.placeholder)
            $input.attr('placeholder', options.placeholder)

        if (options.class)
            $input.addClass(options.class);

        $input.attr('name', options.field);

        $group.find('.form-group-inner').append($input);

        return $group;
    }

    exports.textarea = function(options) {
        options = sanitize(options);

        var $group = getGroup(options);

        var $input = $(templates.inputs.textarea);

        if (options.placeholder)
            $input.attr('placeholder', options.placeholder)

        if (options.class)
            $input.addClass(options.class);

        $input.attr('name', options.field);

        $group.find('.form-group-inner').append($input);

        return $group;
    }

    exports.hidden = function(options) {

        if (typeof options !== "object") {
            throw new Error("Please supply an object of options");
        }

        options = $.extend({}, defaults, options);

        if ( ! options.field )
            throw new Error("Must include a name");


        return $("<input type='hidden' name='"+options.field+"' value='"+options.value+"'>");
    }

    exports.select = function(options) {
        options = sanitize(options);

        if ( ! options.options )
            throw new Error("Must include an object of select options.");

        var $group = getGroup(options);

        var $input = $(templates.inputs.select);

        if (options.class)
            $input.addClass(options.class);

        for (var i in options.options) {
            var $option = $(templates.inputs.option);
            var value = options.options[i];
            var optionValue, optionText;

            if (typeof value == 'object') {
                optionValue = value['value'];
                optionText = value['text'];
            }else {
                optionValue = value[0];
                optionText = value[1];
            }

            $option.attr('value', optionValue);
            $option.html(optionText)

            if (options.selectedValue && options.selectedValue == optionValue)
                $option.attr('selected', 'selected');

            $input.append($option);
        }

        $group.find('.form-group-inner').append($input);

        return $group;
    }

    exports.init = function(_$) {
        return init(_$ || $);
    };

    return exports;
}));