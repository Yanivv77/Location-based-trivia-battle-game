# Stage1: Frontend Build
FROM node:18-slim AS client-build
WORKDIR /usr/src
COPY client/ ./client/
RUN cd Frontend && npm install && npm run build

# Stage2: Backend Build
FROM node:18-slim AS Backend-build
WORKDIR /usr/src
COPY backend/ ./backend/
RUN cd backend && npm install && ENVIRONMENT=production npm run build
RUN ls

# Stage3: Packagign the app
FROM node:18-slim
WORKDIR /root/
COPY --from=client-build /usr/src/client/build ./client/build
COPY --from=backend-build /usr/src/backend/dist .
RUN ls

EXPOSE 5000

CMD ["node", "backend.bundle.js"]