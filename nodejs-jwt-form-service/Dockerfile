FROM node:6.6

RUN mkdir -p /opt/former
WORKDIR /opt/former

COPY package.json /opt/former

RUN npm install && \
    npm cache clean && \
    rm -rf ~/.npm

COPY former /opt/former/former

ENTRYPOINT ["npm"]
CMD ["start"]

EXPOSE 5003
