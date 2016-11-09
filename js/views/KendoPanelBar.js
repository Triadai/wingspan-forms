/* Copyright (c) 2015-2016 Wingspan Technology, Inc. */

import _ from 'lodash'
import kendo from 'kendo'
import React from 'react'
import { findWidget } from '../ReactCommon'

const Children = React.Children;
const PropTypes = React.PropTypes;

const NO_ANIMATION = false;

function panelsChanged(kids1, kids2) {
    let toTitle = (c) => c.props.title;

    return !_.isEqual(Children.map(kids1, toTitle), Children.map(kids2, toTitle));
}

var KendoPanelBar = React.createClass({
    /* Not supporting "contentUrls" or "dataSource" because React components are better content */
    propTypes: {
        animation: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
        dataSource: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        className: PropTypes.string,
        expandMode: PropTypes.string,
        onExpand: PropTypes.func,
        onCollapse: PropTypes.func,
        onSelect: PropTypes.func
    },

    getDefaultProps: function () {
        return {
            expandMode: 'multiple'
        };
    },

    componentDidMount: function () {
        var $el = findWidget(this);

        // The PanelBar is populated via the DOM generated by render
        $el.kendoPanelBar({
            animation: this.props.animation,
            expandMode: this.props.expandMode,
            expand: this.props.onExpand,
            collapse: this.props.onCollapse,
            select: this.props.onSelect,
            dataSource: this.props.dataSource
        });

        // expand based on the 'data-expand' attribute used in render()
        $el.data('kendoPanelBar').expand($el.children('[data-expand=true]'));
    },

    componentWillUnmount: function () {
        // Don't destroy() because it destroys all kendo widgets owned by nested components.
        // findWidget(this, 'kendoPanelBar').destroy();
    },

    componentDidUpdate: function (prevProps) {
        // When new panels are added in an update, they need to be styled properly
        if (panelsChanged(this.props.children, prevProps.children)) {
            let panelBar = findWidget(this, 'kendoPanelBar');

            panelBar._updateClasses();  // Forced to use this private method
            panelBar.expand(panelBar.element.children('[data-expand=true]'), NO_ANIMATION);
        }
    },

    render: function () {
        var kids = Children.toArray(this.props.children);

        return (
            <ul className={this.props.className}>
                {kids.filter(child => child.props.visible !== false)}
            </ul>
        );
    }
});

KendoPanelBar.Item = React.createClass({
    propTypes: {
        title: PropTypes.string,
        expand: PropTypes.bool,
        visible: PropTypes.bool
    },

    render: function () {
        return (
            <li data-expand={this.props.expand}>
                <span className="k-link k-header">{this.props.title}</span>
                <div>{this.props.children}</div>
            </li>
        );
    }
});

export default KendoPanelBar;