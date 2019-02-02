FROM lambci/lambda:build-nodejs8.10

WORKDIR /app

COPY package.json ./

RUN npm install

COPY handler.ts ./
COPY serverless.yml ./

ENTRYPOINT ["/bin/bash"]
