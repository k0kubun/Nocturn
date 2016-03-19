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

<table>
<thead>
<tr><th></th><th>OSX</th><th>Linux, Windows</th></tr>
</thead>
<tbody>
<tr><td> Tweet, Reply, Search           </td><td colspan='2'> <kbd>Enter</kbd>               </td></tr>
<tr><td> Delete a tweet                 </td><td>             <kbd>Cmd-Backspace</kbd>       </td><td> <kbd>Alt-Backspace</kbd> </td></tr>
<tr><td> Add a tweet to favorites       </td><td colspan='2'> <kbd>F</kbd>                   </td></tr>
<tr><td> Retweet a tweet                </td><td>             <kbd>Cmd-Shift-V</kbd>         </td><td> <kbd>Alt-Shift-V</kbd>   </td></tr>
<tr><td> Select a next tweet            </td><td colspan='2'> <kbd>J</kbd>, <kbd>↓</kbd>     </td></tr>
<tr><td> Select a previous tweet        </td><td colspan='2'> <kbd>K</kbd>, <kbd>↑</kbd>     </td></tr>
<tr><td> Select the first tweet         </td><td colspan='2'> <kbd>0</kbd>, <kbd>Space</kbd> </td></tr>
<tr><td> Open url with external browser </td><td colspan='2'> <kbd>T</kbd>                   </td></tr>
<tr><td> Select a next tab              </td><td>             <kbd>Cmd-Shift-]</kbd>         </td><td> <kbd>Alt-P</kbd>         </td></tr>
<tr><td> Select a previous tab          </td><td>             <kbd>Cmd-Shift-[</kbd>         </td><td> <kbd>Alt-O</kbd>         </td></tr>
<tr><td> Select a next account          </td><td>             <kbd>Cmd-J</kbd>               </td><td> <kbd>Alt-J</kbd>         </td></tr>
<tr><td> Select a previous account      </td><td>             <kbd>Cmd-K</kbd>               </td><td> <kbd>Alt-K</kbd>         </td></tr>
<tr><td> Insert a newline               </td><td>             <kbd>Alt-Enter</kbd>           </td><td> <kbd>Shift-Enter</kbd>   </td></tr>
</tbody>
</table>

### Multi account

![](https://i.gyazo.com/be91e798686c0a83a89b9b42a94b24c1.gif)

## Development

```bash
$ npm install
$ npm run setup
$ npm start
```

## Build package

```bash
$ npm run build
```

## License

MIT License
