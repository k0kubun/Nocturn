# Change Log
## v1.5.1
- Change application icon [#52](https://github.com/k0kubun/Nocturn/pull/52)
  - Thanks to @CandyFace
- Support mpd in media popup [#53](https://github.com/k0kubun/Nocturn/pull/53)
  - Thanks to @CandyFace

## v1.5.0
- Window popup for media [#43](https://github.com/k0kubun/Nocturn/pull/43)
  - Thanks to @CandyFace

## v1.4.3
- Fix draggable region on macOS

## v1.4.2
- Fix error on authentication failure [#25](https://github.com/k0kubun/Nocturn/pull/41)
  - Thanks to @chkrl
- Roll back to Electron v1.3.6 to fix bug in Nocturn v1.4.1

## v1.4.1
- Silence favorite button animation on page load [#41](https://github.com/k0kubun/Nocturn/pull/41)
  - Thanks to @IzumiSy
- Fix 2FA bug
- Use Electron v1.4.3

## v1.4.0
- Add favorites tab [#40](https://github.com/k0kubun/Nocturn/pull/40)
  - Thanks to @IzumiSy
- Change tab order

## v1.3.1
- Update a search tab in real time

## v1.3.0
- Support multiple attached photos [#37](https://github.com/k0kubun/Nocturn/pull/37)
  - Thanks to @IzumiSy
- Tweak favorite button's hover color to be the same as official one [#35](https://github.com/k0kubun/Nocturn/pull/35)
  - Thanks to @IzumiSy
- Fix the bug that retweet cannot be favorited [#36](https://github.com/k0kubun/Nocturn/pull/36)
  - Thanks to @IzumiSy

## v1.2.4
- Update favorite icon immediately [#33](https://github.com/k0kubun/Nocturn/pull/33)
  - Thanks to @IzumiSy
- Add favorite animation [#34](https://github.com/k0kubun/Nocturn/pull/34)
  - Thanks to @IzumiSy

## v1.2.3
- Fix scrollbar overlap in macOS [#31](https://github.com/k0kubun/Nocturn/pull/31)
  - Thanks to @IzumiSy
- Link user profile on tweets [#32](https://github.com/k0kubun/Nocturn/pull/32)
  - Thanks to @IzumiSy

## v1.2.2
- Set cursor style on tabs [#29](https://github.com/k0kubun/Nocturn/pull/29)
  - Thanks to @IzumiSy
- Hover stylings for right widgets [#30](https://github.com/k0kubun/Nocturn/pull/30)
  - Thanks to @IzumiSy

## v1.2.1
- Show application icon on Linux too
- Remove tweet from timeline with deleted event

## v1.2.0
- Show application icon on Windows and OSX [#20](https://github.com/k0kubun/Nocturn/pull/20)
  - Thanks to @CandyFace
- Use Electron 1.0
- Support unfavorite by favoriting twice
- Load mentions on reloading

## v1.1.2
- Show a thumbnail of photos in tweet [#19](https://github.com/k0kubun/Nocturn/pull/19)
  - Thanks to @CandyFace

## v1.1.1
- Reconnect streaming by <kbd>Cmd-R</kbd> / <kbd>Ctrl-R</kbd>
- Fix list box size in OSX
- Reduce package size

## v1.1.0
- Key binding for retweet is changed to <kbd>Shift-R</kbd>
- Reduce package size [#12](https://github.com/k0kubun/Nocturn/pull/12)
  - Thanks to @rhysd
- Increase the number of loaded tweets to 50 when loading a list tab or a search tab
- Disable reply key binding on authentication window
- Disable desktop notification for self mention

## v1.0.2
- Don't notify favorite by using account
- Drop top-border of OSX window

## v1.0.1
- Fix the bug in tweet deletion by key binding

## v1.0.0
- Renew the application's design

## v0.5.1
- Drop application header
  - Home and Refresh buttons are dropped too
- Add <kbd>Cmd-R</kbd> / <kbd>Ctrl-R</kbd> keybind for refresh
- Show short URL for images uploaded to twitter

## v0.5.0
- Show a counter of unread mentions
- Desktop notification of mention and favorite
- Limit minimum width of window
- List selector became smaller a bit

## v0.4.3
- Show relative time for tweet timestamp
- Downgrade Electron to v0.36
  - Chrome 39 in Electron v0.37 has an inevitable bug

## v0.4.2
- Use home directory to save credentials
  - Credentials are not discarded in reinstallation from this version
- Show a counter of remaining characters for tweet

## v0.4.1
- Add <kbd>T</kbd> keybind to open url in tweet with external browser
- Add <kbd>Shift-Enter</kbd> keybind to insert a newline in Linux and Windows
- Show delete button instead of reply button for login user's tweet
- Change the color of retweet mark and ellipsis of user name

## v0.4.0
- Renew retweet view
  - Show not-truncated text, retweeted user's name and icon
- Expand short url like with t.co
- Fold long word or url in tweet body
- Truncate long user name

## v0.3.0
- Use string id to prevent overflow
- Don't enable key binding for F, 0, Space when editing text

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
