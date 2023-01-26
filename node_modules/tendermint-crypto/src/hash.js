var createHash = require("create-hash");

function ripemd160(buffer) {
  return createHash('rmd160').update(buffer).digest();
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest();
}

module.exports = {
  ripemd160: ripemd160,
  sha256: sha256,
};
