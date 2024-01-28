# BeatBolt

A GUI frontend for `spotdl` and `yt-dlp`.

## Features

- Automatic picking of downloader
- Queue items can be added and/or removed

## TODOs

- [ ] More accurate progress bar
  - [ ] Migrate away from using terminal commands
- [ ] CI for other platforms

## Running

### Dev server

```
npm i
npm run tauri dev
```

### Building for your platform

You will need a version of rust and some extra packages. On Mac you will need apple frameworks, which if you have nix installed, are provided in the `flake.nix`.

After that you just need run the following in your terminal:

```
npm i
npm run tauri build
```
