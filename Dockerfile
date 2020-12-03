FROM node:latest

# Create app directory
WORKDIR /app

# Install app depencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Binding to PORT 4000
EXPOSE 4000

CMD ["node", "src/index.js"]
