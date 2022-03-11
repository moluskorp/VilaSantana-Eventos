import { create } from 'venom-bot';

const client = await create(
    'session',
    (base64Qr, asciiQR, attempts, urlCode) => {
        console.log(asciiQR);
        const matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        const response = {};

        if (matches?.length !== 3) {
            return new Error('Invalid input string');
        }
        response.type = matches[1];
        response.data = new Buffer.from(matches[2], 'base64');

        const imageBuffer = response;
        require('fs').writeFile(
            'out.png',
            imageBuffer.data,
            'binary',
            function (err) {
                if (err != null) {
                    console.log(err);
                }
            },
        );
    },
    undefined,
    { logQR: false },
)
    .then(client2 => {
        start(client2);
    })
    .catch(err => {
        console.log(err);
    });

function start(client) {
    client.onMessage(message => {
        if (message.body === 'Hi' && message.isGroupMsg === false) {
            try {
                const result = client.sendText(message.from, 'WelcomeVenom');
                console.log(result);
            } catch (err) {
                console.log(err);
            }
        }
    });
}

export const oi = start(client);
