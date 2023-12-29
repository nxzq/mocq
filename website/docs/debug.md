---
title: Debug
sidebar_position: 5
---

when debugging turn on the `MOCQ_VERBOSE` env variable for verbose logs and insights on what's happening

### .env file

```bash
export MOCQ_VERBOSE=true
```

### inline code

```ts
process.env.MOCQ_VERBOSE = 'true'
```

### inline cli

```bash
MOCQ_VERBOSE=true npm run test
```