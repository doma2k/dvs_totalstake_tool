var naclFactory = require("js-nacl");
var nacl = naclFactory.instantiate();
var hash = require("./hash");
var hex = require("./hex");

//--------------------------------------------------------------------------------

var PubKeyTypeEd25519 = 0x01;

function PubKeyEd25519(bytes) {
  this.bytes = bytes;
}

PubKeyEd25519.prototype.verifyString = function(msgStr, sig) {
	var msgBytes = nacl.encode_utf8(msgStr);
	var verify = nacl.crypto_sign_verify_detached(sig.bytes, msgBytes, this.bytes);
	return verify;
}

PubKeyEd25519.prototype.makeAddress = function() {
	return hash.ripemd160(this.bytes);
}

PubKeyEd25519.prototype.toJSON = function() {
  return [PubKeyTypeEd25519, hex.encode(this.bytes)];
}

//--------------------------------------------------------------------------------

var PrivKeyTypeEd25519 = 0x01;

function PrivKeyEd25519(bytes) {
  this.bytes = bytes;
}

function genPrivKeyEd25519() {
  var keypair = nacl.crypto_sign_keypair();
  var privKeyBytes = keypair.signSk;
  //var pubKeyBytes = keypair.signPk;
  return new PrivKeyEd25519(privKeyBytes);
}

PrivKeyEd25519.prototype.signString = function(msgStr) {
  var signBytes = nacl.encode_utf8(msgStr);
  var sigBytes = nacl.crypto_sign_detached(signBytes, this.bytes);
  var sig = new SignatureEd25519(sigBytes);
  return sig
}

PrivKeyEd25519.prototype.makePubKey = function() {
  if (this.bytes.length != 64) {
	  throw "Cannot makePubKey: Invalid PrivKeyEd25519 bytes"
  }
  return new PubKeyEd25519(this.bytes.subarray(32,64));
}

PrivKeyEd25519.prototype.toJSON = function() {
  return [PrivKeyTypeEd25519, hex.encode(this.bytes)];
}

//--------------------------------------------------------------------------------

var SignatureTypeEd25519 = 0x01;

function SignatureEd25519(bytes) {
  this.bytes = bytes;
}

SignatureEd25519.prototype.toJSON = function() {
  return [SignatureTypeEd25519, hex.encode(this.bytes)];
}

//--------------------------------------------------------------------------------

module.exports = {
  PubKeyEd25519: PubKeyEd25519,
  genPrivKeyEd25519: genPrivKeyEd25519,
  PrivKeyEd25519: PrivKeyEd25519,
  SignatureEd25519: SignatureEd25519,
}
