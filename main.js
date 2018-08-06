var bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;

var EchoCharacteristic = require('./characteristic');

console.log('NIBVA Spoof');

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('echo', ['ec00', 'ec01', 'ec02', 'ec03', 'ec04', 'ec05', 'ec06', 'ec07']);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: 'ec00',
        characteristics: [
          new EchoCharacteristic('ec10'),
          new EchoCharacteristic('ec11'),
          new EchoCharacteristic('ec12'),
        ],
      }),
      new BlenoPrimaryService({
      	uuid: 'ec01',
      	characteristics: [
          new EchoCharacteristic('ec20'),
          new EchoCharacteristic('ec21'),
          new EchoCharacteristic('ec22'),
        ],
      }),
      new BlenoPrimaryService({
      	uuid: 'ec02',
      	characteristics: [
          new EchoCharacteristic('ec30'),
          new EchoCharacteristic('ec31'),
          new EchoCharacteristic('ec32'),
        ],
      }),
      new BlenoPrimaryService({
      	uuid: 'ec03',
      	characteristics: [
          new EchoCharacteristic('ec40'),
          new EchoCharacteristic('ec41'),
          new EchoCharacteristic('ec42'),
        ],
      }),
      new BlenoPrimaryService({
      	uuid: 'ec04',
      	characteristics: [
          new EchoCharacteristic('ec50'),
          new EchoCharacteristic('ec51'),
          new EchoCharacteristic('ec52'),
        ],
      }),
      new BlenoPrimaryService({
      	uuid: 'ec05',
      	characteristics: [
          new EchoCharacteristic('ec60'),
          new EchoCharacteristic('ec61'),
          new EchoCharacteristic('ec62'),
        ],
      }),
      new BlenoPrimaryService({
      	uuid: 'ec06',
      	characteristics: [
          new EchoCharacteristic('ec70'),
          new EchoCharacteristic('ec71'),
          new EchoCharacteristic('ec72'),
        ],
      }),
	  new BlenoPrimaryService({
      	uuid: 'ec07',
      	characteristics: [
          new EchoCharacteristic('ec80'),
          new EchoCharacteristic('ec81'),
          new EchoCharacteristic('ec82'),
        ],
      })
    ]);
  }
});
