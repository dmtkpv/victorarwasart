module.exports = function (source) {
    return source.replace(/"(\d+)\w+"/g, '$1');
}