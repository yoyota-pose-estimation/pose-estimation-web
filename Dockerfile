FROM node:lts-alpine as install
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]


FROM install as build
RUN npm run build


FROM nginx:alpine
COPY --from=build /usr/src/app/build /app/build
