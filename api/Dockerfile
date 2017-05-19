FROM node
RUN mkdir /app
RUN mkdir /uploads
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["npm", "start"]