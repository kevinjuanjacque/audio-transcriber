const token = process.env.WHATSAPP_TOKEN;
const axios = require('axios');
const fs = require('fs-extra');
const { getAudio } = require('../utils/get_audio');
const { getTextFromAudio } = require('../utils/get_text_from_audio');
const { getUriAudio } = require('../utils/get_uri_audio');
const { sendTranscription } = require('../utils/send_transcription');
const { uploadFile } = require('../utils/upload-file');

const webhookVerify = (req, res) => {
  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
   **/
  const verify_token = 'test-cl';
  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  if (mode && token) {
    if (mode === 'subscribe' && token === verify_token) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.status(403).json({ error: 'error' });
    }
  } else {
    return res.status(403).json({ error: 'error' });
  }
};

const webhookReceptionMsg = async (req, res) => {
  // Parse the request body from the POST
  let body = req.body;
  if (req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      // axios({
      //   method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
      //   url:
      //     'https://graph.facebook.com/v12.0/' +
      //     phone_number_id +
      //     '/messages?access_token=' +
      //     token,
      //   data: {
      //     messaging_product: 'whatsapp',
      //     to: from,
      //     text: { body: 'Ack: ' + msg_body },
      //   },
      //   headers: { 'Content-Type': 'application/json' },
      // });
      if (req.body.entry[0].changes[0].value.messages[0].type == 'audio') {
        //TODO: es audio
        const url = await getUriAudio(
          req.body.entry[0].changes[0].value.messages[0].audio.id
        );
        console.log('url: ' + url);
        const audio = await getAudio(url);
        //await uploadFile(res.nameFile, path);
        const text = await getTextFromAudio(audio.nameFile);
        const from = req.body.entry[0].changes[0].value.messages[0].from;
        await sendTranscription(text, from);
        return res.sendStatus(200);
      } else {
        console.log('NO ES AUDIO');
        return res.sendStatus(200);
      }
    }
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    res.sendStatus(404);
  }
};

module.exports = {
  webhookVerify,
  webhookReceptionMsg,
};
