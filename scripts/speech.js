const speech = require('@google-cloud/speech');
const fs = require('fs-extra');

(async () => {
  const uri = 'gs://test-1183/audio-files/' + '1656343307893.mp3';
  const client = new speech.SpeechClient();
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  const encoding = 'OGG_OPUS';
  const sampleRateHertz = 16000;
  const languageCode = 'es-CL';

  const config = {
    encoding: encoding,
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
  console.log(response);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join('\n');
  console.log('Transcription: ', transcription);
})();
