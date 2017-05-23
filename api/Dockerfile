FROM node
RUN mkdir /app
RUN mkdir /app/uploads
WORKDIR /app
COPY package.json /app
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]