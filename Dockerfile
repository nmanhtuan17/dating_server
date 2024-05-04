FROM node:20.10.0

WORKDIR /app
COPY package.json* .
RUN npm install
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "run", "production"]

