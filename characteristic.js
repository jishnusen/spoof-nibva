var util = require('util');

var bleno = require('bleno');

var BlenoCharacteristic = bleno.Characteristic;

var EchoCharacteristic = function(custuuid) {
  EchoCharacteristic.super_.call(this, {
    uuid: custuuid,
    properties: ['read', 'notify'],
    value: null
  });

  this._value = new Buffer(0);
  this._updateValueCallback = null;
};

util.inherits(EchoCharacteristic, BlenoCharacteristic);

EchoCharacteristic.prototype.onReadRequest = function(offset, callback) {
  console.log('EchoCharacteristic - onReadRequest: value = ' + this._value.toString('hex'));

  test = new Buffer(32*4)
  test.writeUInt32LE((Math.random() * 100)+1)
  for (i = 0; i < 4; i++) {
    idx = i * 32;
    test.writeUInt32LE(Math.random() * 100, idx);
  }
  this._value = test
  this._updateValueCallback = true;
  callback(this.RESULT_SUCCESS, this._value);
};

EchoCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('EchoCharacteristic - onSubscribe');

  this._updateValueCallback = updateValueCallback;
};

EchoCharacteristic.prototype.onUnsubscribe = function() {
  console.log('EchoCharacteristic - onUnsubscribe');

  this._updateValueCallback = null;
};

module.exports = EchoCharacteristic;
