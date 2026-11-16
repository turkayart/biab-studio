FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY server.js ./
COPY config ./config
COPY models ./models
COPY migrations ./migrations
COPY middleware ./middleware
COPY controllers ./controllers
COPY routes ./routes
COPY services ./services
COPY scripts ./scripts
COPY public ./public
USER node
ENV NODE_ENV=production APP_PORT=3000
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s CMD node -e "fetch('http://127.0.0.1:'+process.env.APP_PORT+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
