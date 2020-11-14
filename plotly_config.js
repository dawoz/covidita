/**
 * Default layout
 * @param title
 * @returns {{margin: {b: number, r: number, t: number, l: number}, legend: {orientation: string, x: number, y: number}, showlegend: boolean, title: *}}
 */
const getLayout = function (title) {
    return {
        title: title,
        margin: {l: 50, t: 50, b: 100, r: 50},
        showlegend: true,
        legend: {
            orientation: 'h',
            x: 0,
            y: -0.15
        }
    }
};

/**
 * Default config
 * @returns {{displayModeBar: boolean, displaylogo: boolean, scrollZoom: boolean, responsive: boolean, noJs: boolean, modeBarButtonsToRemove: string[]}}
 */
const getConfig = function () {
    return {
        noJs: true,
        responsive: true,
        scrollZoom: false,
        displaylogo: false,
        displayModeBar: true,
        modeBarButtonsToRemove: ['toImage', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'toggleSpikelines']
    }
};

/**
 * Default trace format
 * @param title
 * @param x
 * @param y
 * @param visible
 * @returns {{visible: (boolean|string), line: {shape: string}, x: *, name: *, y: *, type: string}}
 */
const getTrace = function (title, x, y, visible = true) {
    return {
        x: x,
        y: y,
        type: 'scatter',
        name: title,
        line: {shape: 'spline'},
        visible: visible ? true : 'legendonly'
    }
};