# jerryyf.dev

## Dependencies

- nodejs
- pnpm

## Development

Set the Telegram bot configuration before starting the application:

```bash
export BOT_TOKEN=your-bot-token
export CHAT_ID=your-chat-id
```

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
docker run --env BOT_TOKEN --env CHAT_ID -p 127.0.0.1:3000:3000 jerryyf.dev:latest
```

In Kubernetes, inject `BOT_TOKEN` and `CHAT_ID` into the existing Deployment
from a Secret. The application sends visit notifications directly to the
Telegram Bot API, so it no longer requires AWS credentials or Lambda settings.
