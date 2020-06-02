FROM node:8

WORKDIR /app/
COPY ./package*.json /app/
RUN npm install

COPY ./ /app/

ENV PORT=3000
ENV DB_HOST=assignment2.cogkys8dvclp.us-east-1.rds.amazonaws.com
ENV DB_PORT=3306
ENV DB_USERNAME=root
ENV DB_PASSWORD=assignment2
ENV DB_NAME=assignment2

EXPOSE 3000
CMD ["npm", "start"]