import React from 'react'
import { noop } from '../ReactCommon'

var PropTypes = React.PropTypes;

var MultilineText = React.createClass({

    propTypes: {
        id: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        noControl: PropTypes.bool,
        minLength: PropTypes.number,
        maxLength: PropTypes.number,
        trimValue: PropTypes.bool,
        style: PropTypes.any
    },

    statics: { fieldClass: function () { return 'formFieldTextarea'; } },

    getDefaultProps: function () {
        return {
            value: '',
            onChange: noop,
            placeholder: '',
            disabled: false,
            readonly: false,
            noControl: false,
            trimValue: true,
            style: {}
        };
    },

    /* jshint ignore:start */
    render: function () {
        if (this.props.noControl) {
            // Use a <pre> tag because there are newlines in the text that should be preserved.
            return (<pre>{this.props.value || ''}</pre>);
        }
        return (
            <textarea id={this.props.id}
                className="k-textbox"
                value={this.props.value || ''}
                onChange={this.onChange}
                onBlur={this.onBlur}
                placeholder={this.props.placeholder}
                readOnly={this.props.readonly}
                style={this.props.style}
                disabled={this.props.disabled} />
        );
    },
    /* jshint ignore:end */

    onBlur: function (event) {
        var val = event.target.value;

        // Only fire a change event if the trim() will change the value
        if (this.props.trimValue && val !== val.trim()) {
            this.props.onChange(val.trim());
        }

        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    },

    onChange: function (event) {
        var val = event.target.value;

        if (this.props.maxLength && val.length > this.props.maxLength) {
            return;
        }
        this.props.onChange(val);
    }
});

export default MultilineText;