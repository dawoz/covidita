/**
 * Returns the array of differences [ a[0], a[1]-a[0], a[2]-a[1], ... , a[a.length-1]-a[a.length-2] ]
 * @param array
 * @returns {[]} array of differences
 */
const diffArray = function (array) {
    if (!(array instanceof Array) || array.length <= 0 || typeof array[0] !== 'number')
        throw 'Parameter must be an array of at least one number';
    var diff = [];
    for (var i = 0; i < array.length; i++)
        diff.push(i === 0 ? array[i] : array[i] - array[i-1])
    return diff;
}

/**
 * Returns the array of sums such that a[i] = sum([ a[0], ... , a[i-1] ]), or a[i] = a[0] if i == 0
 * @param array
 * @returns {[]} array of sums
 */
const sumArray = function (array) {
    if (!(array instanceof Array) || array.length <= 0 || typeof array[0] !== 'number')
        throw 'Parameter must be an array of at least one number';
    var sum = 0;
    var sumArray = [];
    for (var i = 0; i < array.length; i++) {
        sum += array[i];
        sumArray.push(sum)
    }
    return sumArray;
}

/**
 * Returns the (array.length+index)-th element of the array: the purpose is to get the elements from the end of
 * the array in a python-like manner
 * @param array
 * @param index: must be in the range [-array.length, -1]
 * @returns {*} element indexed
 */
const getFromEnd = function (array, index) {
    if (!(array instanceof Array))
        throw 'First parameter must be an array'
    if (typeof index !== 'number' || index >= 0 || index < -array.length)
        throw 'Index must be a number in range [-array.length, -1]'
    return array[array.length+index];
};

/**
 * Formats a date DD/MM/YYYY
 * @param dateString
 * @returns {string} formatted date
 */
const formatDateDDMMYYYY = function (dateString) {
        var date = new Date(dateString);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    };

/**
 * Formats a string from snake case to normal (this_is_an_example => This is an example)
 * @param str
 * @returns {string} formatted string
 */
const formatString = function (str) {
    var strSpaces = str.replaceAll('_', ' ');
    return strSpaces.charAt(0).toUpperCase() + strSpaces.substr(1, strSpaces.length);
};

/**
 * Formats a number with italian convention (999.999.999,999)
 * @param n
 * @returns {*} formatted number
 */
const formatNumber = function (n) {
    return Intl.NumberFormat().format(n);
};

/**
 * Formats a percentage with 4 precision
 * @param n
 * @returns {string} formatted percentage
 */
const formatPercentage = function (n) {
    return n.toPrecision(4)+'%';
}

/**
 * Elementwise division of arrays
 * @param a1
 * @param a2
 * @returns {[]}
 */
const divArray = function (a1, a2) {
    if (a1 == null || a2 == null || !(a1 instanceof Array) || !(a2 instanceof Array)
        || a1.length === 0 || a2.length === 0 || a1.length !== a2.length)
        throw 'Parameters must be arrays of the same length (greater than zero)'
    var r = [];
    for(var i = 0; i < a1.length; i++)
        r.push(a1[i]/a2[i]);
    return r;
}