var nacl = naclFactory.instantiate();

function randBytes(len) {
  return nacl.random_bytes(len);
}

module.exports = {
  randBytes: randBytes,
}
