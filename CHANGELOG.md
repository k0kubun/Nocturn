# Change Log
## v0.2.5
- Make Cmd-j, Cmd-k working when not editing text
- Improve rendering performance

## v0.2.4
- Improve rendering performance

## v0.2.3
- Limits tweets for each tab upto 100
- Increase number of initial loaded tweets from 20 to 50

## v0.2.2
- Reduce package size
- Improve performance to move tweet focus
- Drop J, K, Up, Down from menu
- Don't show relative time due to performance reason
  - It'll be fixed in the future

## v0.2.1
- Improve rendering performance

## v0.2.0
Full scratch of implementation.

### Improved
- Show tweet timestamp with relative time.
- Correctly add tweets loaded from streaming to mention tab.
- Limit tweets for each tab upto 1000 to keep performance for a long time.
- Prevent tweet overflow from initial screen.
- Support Linux's HiDPI require https://github.com/atom/electron/pull/2980.
- Add tweet posted from Nocturn to timeline.
- All commands and shortcut information are available on menu.
- Avoid key binding conflict when editing a search query.
- Reload profile image on application start. Fixes [#5](https://github.com/k0kubun/Nocturn/pull/5).
  - Thanks to @akawshi
- Fold all newlines in tweet text. Fixes [#4](https://github.com/k0kubun/Nocturn/pull/4)
  - Thanks to @akawshi

### Changed
- Some key bindings are removed.
  - Now key bindings are different between Mac and others.

### Regression
- Selecting tweet became slower.

## v0.1.8
- Support Two-Factor Authentication

## v0.1.7
- Fix title bar offset for Windows and Linux
- Change link color in active tweet to white

## v0.1.6
- Autolink url [#3](https://github.com/k0kubun/Nocturn/pull/3).
  - Thanks to @rrreeeyyy

## v0.1.5
- Release only for Mac
  - Fix app quit issue
  - Yosemite-like application window

## v0.1.4
- Prevent focusing on unexpected elements

## v0.1.3
- Support basic edit acton on OSX
  - cut, copy, paste, select all

## v0.1.2
- Add key bindings of `h`, `l`, `n`, `p`

## v0.1.1
- Fix bugs in search tab

## v0.1.0
- Support multi-account
- Implement retweet

## v0.0.4
- Drop animation of tweet addition
- Add shortcuts for tab changes (`Cmd-{`, `Cmd-}`)

## v0.0.3
- Change font-family for OSs other than OSX

## v0.0.2
- Stop using CDN and compress CSS for faster loading
- Update io.js to fix load failure on windows
  - https://github.com/electron-userland/electron-prebuilt/issues/40
- Ignore some development modules to reduce package size

## v0.0.1
- Initial release
