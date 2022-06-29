require('dotenv').config();
const axios = require('axios');
const fs = require('fs-extra');
const { getAudio } = require('./src/utils/get_audio');
const { getTextFromAudio } = require('./src/utils/get_text_from_audio');
const { sendTranscription } = require('./src/utils/send_transcription');

(async () => {
  await sendTranscription('prueba-final', '56952767383');
})();
