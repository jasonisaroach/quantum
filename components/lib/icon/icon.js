var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import * as ClassNames from 'classnames';
import './css/font-awesome.css';
var Icon = (function (_super) {
    __extends(Icon, _super);
    function Icon(props) {
        return _super.call(this, props) || this;
    }
    Icon.prototype.componentWillMount = function () { };
    Icon.prototype.componentDidMount = function () { };
    Icon.prototype.componentWillReceiveProps = function (nextProps) { };
    Icon.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return true;
    };
    Icon.prototype.componentWillUpdate = function (nextProps, nextState) { };
    Icon.prototype.componentDidUpdate = function (prevProps, prevState) { };
    Icon.prototype.componentWillUnmount = function () { };
    Icon.prototype.render = function () {
        var className = ClassNames('icon');
        return (React.createElement("div", { className: className },
            React.createElement("div", { id: "icon" })));
    };
    return Icon;
}(React.Component));
export { Icon };
//# sourceMappingURL=icon.js.map