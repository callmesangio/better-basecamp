# Better Basecamp

A browser extension for Chrome and Firefox that removes the wallpaper
background from Basecamp pages.

## Project layout

```
src/                  Shared extension sources
chrome/manifest.json  Chrome manifest
firefox/manifest.json Firefox manifest
build.sh              Builds a loadable extension per browser into dist/
```

## Build

```sh
./build.sh            # builds dist/chrome and dist/firefox
./build.sh firefox    # builds a single browser
```

Each `dist/<browser>/` folder contains the shared sources from `src/` plus that
browser's `manifest.json`. Rebuild after every change.

## Load in Chrome

1. Run `./build.sh chrome`.
2. Open `chrome://extensions`.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select the `dist/chrome/` folder.

After rebuilding, click the reload icon on the extension's card, then refresh
any open Basecamp tabs.

The extension stays installed across browser restarts.

## Load in Firefox

1. Run `./build.sh firefox`.
2. Open `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on…** and select `dist/firefox/manifest.json`.

After rebuilding, click **Reload** next to the add-on, then refresh any open
Basecamp tabs.

Temporary add-ons are removed when Firefox closes, so repeat step 3 after each
restart.

## License

[MIT](LICENSE)
