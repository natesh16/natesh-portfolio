---
title: Deploying a MERN app on AWS EC2 with Docker
date: 2026-11-20
summary: A sample post showing the layout. Replace it with your own writing.
tags: AWS, Docker, MERN
---

This is a **sample post** so you can see how the blog looks. Delete this file or set `draft: true` in the header once your own posts are in.

## The shape of the deployment

A small MERN application usually needs three things running: the React build, the Node API and a database. Containers keep each of them reproducible from one machine to the next.

- **Frontend:** a static build served by Nginx
- **API:** a Node and Express container
- **Database:** MongoDB, managed or self-hosted

## A minimal Dockerfile

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

> Pin your base image versions so a rebuild next month produces the same result as today.

## Next steps

Once the container runs locally, push the image to a registry and pull it on the EC2 instance. Read more in the [Docker documentation](https://docs.docker.com/).
