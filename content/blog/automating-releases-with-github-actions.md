---
title: Automating releases with GitHub Actions
date: 2026-11-10
summary: Another sample post. It shows lists, code and links in the post layout.
tags: CI/CD, GitHub Actions
draft: true
---

Automated pipelines turn releases from an event into a routine. This sample sketches the idea.

## A basic workflow

```yaml
name: ci
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
```

## What to automate first

1. Run tests on every push
2. Build the container image
3. Deploy only when the tests pass
