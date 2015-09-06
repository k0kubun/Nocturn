# Nocturn

YoruFukurou-like Twitter Client built on Electron

![](https://i.gyazo.com/f50b8192eed6adfcb49c9b3374d5a7bb.png)

## Features
- Realtime timeline using UserStream
- Multi-account support
- Vim-like key bindings
- Works on Windows, OSX and Linux

### Demo

![](https://i.gyazo.com/3f89eaf9e85820ef0ba79bc2db7c478e.gif)

## Installation

Download an archive from following link and unzip it.

https://github.com/k0kubun/Nocturn/releases

## Usage

### Key bindings

|Key|Command|
|:---|:---|
|Enter| Tweet, Reply, Search |
|j, ↓|Select a next tweet|
|k, ↑|Select a previous tweet|
|0, space|Select the first tweet|
|f|Add a tweet to favorites|
|Cmd-Shift-v|Retweet a tweet|
|Cmd-backspace|Delete a tweet|
|Cmd-Shift-]|Select a next tab|
|Cmd-Shift-[|Select a previous tab|
|Cmd-j|Select a next account|
|Cmd-k|Select a previous account|

Regard Cmd as Windows or Meta key if you're not using OSX.

### Multi account

![](https://i.gyazo.com/be91e798686c0a83a89b9b42a94b24c1.gif)

## Development

```bash
$ npm install
$ npm run bower
$ npm start
```

## Build package

```bash
$ npm build
```

## License

MIT License
