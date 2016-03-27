# Nocturn

Multi-platform Twitter Client built on Electron

<img src='https://i.gyazo.com/b7fb495a0b9aea0f66e8ee58861a61b9.png' width='400px' />

## Features
- Realtime timeline using UserStream
- Multi-account support
- Vim-like key bindings
- Works on Windows, OSX and Linux

### Demo

<img src='https://i.gyazo.com/ae886c77a2dee1f20daebc4f3c28ddc5.gif' width='444px' />

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
<tr><td> Tweet, Reply, Search           </td><td colspan='2'> <kbd>Enter</kbd>                                                  </td></tr>
<tr><td> Delete a tweet                 </td><td>             <kbd>Cmd-Backspace</kbd>       </td><td> <kbd>Alt-Backspace</kbd> </td></tr>
<tr><td> Favorite a tweet               </td><td colspan='2'> <kbd>F</kbd>                                                      </td></tr>
<tr><td> Retweet a tweet                </td><td colspan='2'> <kbd>Shift-R</kbd>                                                </td></tr>
<tr><td> Select a next tweet            </td><td colspan='2'> <kbd>J</kbd>, <kbd>↓</kbd>                                        </td></tr>
<tr><td> Select a previous tweet        </td><td colspan='2'> <kbd>K</kbd>, <kbd>↑</kbd>                                        </td></tr>
<tr><td> Select the first tweet         </td><td colspan='2'> <kbd>0</kbd>, <kbd>Space</kbd>                                    </td></tr>
<tr><td> Open url with external browser </td><td colspan='2'> <kbd>T</kbd>                                                      </td></tr>
<tr><td> Select a next tab              </td><td>             <kbd>Cmd-Shift-]</kbd>         </td><td> <kbd>Alt-P</kbd>         </td></tr>
<tr><td> Select a previous tab          </td><td>             <kbd>Cmd-Shift-[</kbd>         </td><td> <kbd>Alt-O</kbd>         </td></tr>
<tr><td> Select a next account          </td><td>             <kbd>Cmd-J</kbd>               </td><td> <kbd>Alt-J</kbd>         </td></tr>
<tr><td> Select a previous account      </td><td>             <kbd>Cmd-K</kbd>               </td><td> <kbd>Alt-K</kbd>         </td></tr>
<tr><td> Insert a newline               </td><td>             <kbd>Alt-Enter</kbd>           </td><td> <kbd>Shift-Enter</kbd>   </td></tr>
<tr><td> Reload tweets and streaming    </td><td>             <kbd>Cmd-R</kbd>               </td><td> <kbd>Ctrl-R</kbd>        </td></tr>
</tbody>
</table>

### Multi account

<img src='https://i.gyazo.com/b8a9455ff33ef05b002f6d8dc5173fa6.gif' width='444px' />

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
