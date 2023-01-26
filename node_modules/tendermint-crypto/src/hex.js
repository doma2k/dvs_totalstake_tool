var hexEncodeArray = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
];

function hexEncode(arr) {
  var s = '';
  for (var i = 0; i < arr.length; i++) {
    var code = arr[i];
    s += hexEncodeArray[code >>> 4];
    s += hexEncodeArray[code & 0x0F];
  }
  return s;
}

module.exports = {
  encode: hexEncode,
};
