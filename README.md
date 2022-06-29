# Transcriptor de audios a textos

El trascriptor utiliza servicios como el de api de wsp y speech to text de GCP, para esto se requiere:

- Habilitar el Meta develoment
- Consola a gcp (speech to text, storage, app engine)

## Tech

Tecnologias utilizadas:

- [Node js] - Motor js
- [Express] - Para crear servicio backend
- [SDK GCP] - Correr comandos y ejecutar app egine

## Installation

Para la instalacion se requiere de [Node.js](https://nodejs.org/) v10+ o superior.

Installar las dependencias

```sh
npm install
```

Corre el proyecto

```sh
npm start
```

## Correr Proyecto en App Engine

Primero se debe ajustar el token de Whatsapp en el app.yaml...

```sh
WHATSAPP_TOKEN:TU-TOKEN
```

Para subir el proyecto a app engine debes correr

```sh
gcloud app deploy
```

Revisar logs

```sh
gcloud app logs tail -s default
```

## Plugins

PLUGINS UTILIZADOS

| Plugin                                                                                             |
| -------------------------------------------------------------------------------------------------- |
| [Speech-to-text](https://cloud.google.com/speech-to-text/docs/basics)                              |
| [Storage-cloud](https://cloud.google.com/storage/docs/reference/libraries?hl=es-419)               |
| [App-Enginee](https://cloud.google.com/appengine/docs/nodejs?hl=es-419)                            |
| [Meta-Develope (wsp)](https://developers.facebook.com/docs/whatsapp-business-platform/get-started) |
