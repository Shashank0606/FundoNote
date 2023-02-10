const amqp = require('amqplib/callback_api');


export const producer = (queue, msg) => {
    amqp.connect('amqp://localhost', (error, connection) => {
        if (error) {
            throw error;
        }

        connection.createChannel((error, channel) => {
            if (error) {
                throw error;
            }

            channel.assertQueue(queue, {
                durable: false
            });

            channel.sendToQueue(queue, Buffer.from(msg));
            console.log("Sent Message is :", msg);

            setTimeout(() => {
                connection.close();
            }, 100)
        })
    });
}



export const receiver = (queue) => {
    amqp.connect('amqp://localhost', (error, connection) => {
        if (error) {
            throw error;
        }

        connection.createChannel((error, channel) => {
            if (error) {
                throw error;
            }

            channel.assertQueue(queue, {

                durable: false
            });

            console.log(queue);
            channel.consume(queue, async function (msg) {
                const objectJson = msg.content.toString();
                const objectNormal = JSON.parse(objectJson);
                const EmailId = objectNormal.email;
                const Firstname = objectNormal.firstname;
                const Lastname = objectNormal.lastname;
                // const result = await sendMailToNewUser(EmailId, Firstname, Lastname);
                console.log("results", "Email id = ", EmailId, "First name= ", Firstname, "Last name=", Lastname);

            }, {
                noAck: true
            });



        });
    });
}

receiver('receive');