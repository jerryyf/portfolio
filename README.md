# jerryyf.dev

A mobile-friendly, interactive CRT terminal portfolio, inspired by the look of
[cool-retro-term](https://github.com/Swordfish90/cool-retro-term). The monitor and
phosphor effects are CSS; no terminal emulator or remote shell is involved.

Use the command shortcuts or enter `about`, `credentials`, `links`, `contact`,
`help`, or `clear`. Arrow keys recall command history, Tab completes commands,
and Ctrl/Cmd + L clears output. The display controls switch between green,
amber, and white phosphor. Reduced-motion preferences
are respected. `/contact` opens the same terminal with contact details shown.
The CRT screen has a viewport-sized height; command output scrolls inside it,
automatically revealing the latest output without growing the monitor.

## Dependencies

- nodejs
- pnpm

## Development

### Starting dev server

```bash
pnpm dev
```

### Building and starting prod server

```bash
pnpm build
pnpm start
```

### Docker

```bash
docker buildx build -t jerryyf.dev .
docker run -p 127.0.0.1:3000:3000 jerryyf.dev:latest
```