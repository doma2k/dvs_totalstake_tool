var crypto = require("./src");
console.log(crypto);

var privKey = crypto.genPrivKeyEd25519();
var pubKey = privKey.makePubKey();
var sig = privKey.signString("some message");
var valid = pubKey.verifyString("some message", sig);
if (valid == false) {
	throw("signature failed to validate");
}
var valid2 = pubKey.verifyString("other message", sig);
if (valid2 != false) {
	throw("signature should have failed");
}

console.log("all good!");
