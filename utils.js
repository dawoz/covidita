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