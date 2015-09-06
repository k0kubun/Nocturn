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
|<kbd>Enter</kbd>| Tweet, Reply, Search |
|<kbd>j</kbd>, <kbd>↓</kbd>|Select a next tweet|
|<kbd>k</kbd>, <kbd>↑</kbd>|Select a previous tweet|
|<kbd>0</kbd>, <kbd>space</kbd>|Select the first tweet|
|<kbd>f</kbd>|Add a tweet to favorites|
|<kbd>Cmd-Shift-v</kbd>|Retweet a tweet|
|<kbd>Cmd-backspace</kbd>|Delete a tweet|
|<kbd>h</kbd>, <kbd>Cmd-Shift-]</kbd>|Select a next tab|
|<kbd>l</kbd>, <kbd>Cmd-Shift-[</kbd>|Select a previous tab|
|<kbd>n</kbd>, <kbd>Cmd-j</kbd>|Select a next account|
|<kbd>p</kbd>, <kbd>Cmd-k</kbd>|Select a previous account|

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
