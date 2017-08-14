import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Chart } from './chart';
it('renders without crashing', function () {
    var div = document.createElement('div');
    ReactDOM.render(React.createElement(Chart, { name: "testy", width: 500, height: 500, options: {
            scales: {}
        }, data: { labels: ['hello'] }, type: "bar" }), div);
});
//# sourceMappingURL=chart.test.js.map