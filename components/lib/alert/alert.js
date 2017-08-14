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
import './alert.css';
var Alert = (function (_super) {
    __extends(Alert, _super);
    function Alert(props) {
        return _super.call(this, props) || this;
    }
    // public componentWillMount() {}
    // public componentDidMount() {}
    // public componentWillReceiveProps(nextProps: IAlertProps) {}
    Alert.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return true;
    };
    // public componentWillUpdate(nextProps: IAlertProps, nextState: IAlertState) {}
    // public componentDidUpdate(prevProps: IAlertProps, prevState: IAlertState) {}
    // public componentWillUnmount() {}
    Alert.prototype.render = function () {
        var className = ClassNames('alert');
        return (React.createElement("div", { className: className }, this.props.children));
    };
    return Alert;
}(React.Component));
export { Alert };
//# sourceMappingURL=alert.js.map