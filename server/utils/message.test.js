var expect = require('expect');

var { generateMessage } = require('./message')

describe('Generate Message', () => {

    it('should generate correct message object', () => {
        //store res in variable
        var from = 'jawann';
        var text = 'hello world';

        var message = generateMessage(from, text)

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text})

    })
})