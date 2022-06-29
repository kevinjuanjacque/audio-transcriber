const speech = require('@google-cloud/speech');
const { promises } = require('fs-extra');
const fs = require('fs-extra');

const getTextFromAudio = async (file) => {
  const uri = 'gs://test-1183/audio-files/' + file;
  console.log(uri);
  const client = new speech.SpeechClient();
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */

  const sampleRateHertz = 16000;
  const languageCode = 'es-CL';

  //"ENCODING_UNSPECIFIED" | "LINEAR16" | "FLAC" | "MULAW" | "AMR" | "AMR_WB" | "OGG_OPUS" | "SPEEX_WITH_HEADER_BYTE" | "WEBM_OPUS" | null | undefined
  const config = {
    encoding: 'WEBM_OPUS',
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  };
  const audio = {
    uri: uri,
  };

  const request = {
    config: config,
    audio: audio,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join('\n');

  console.log('Transcription: ', transcription);
  return transcription;
};

module.exports = { getTextFromAudio };
