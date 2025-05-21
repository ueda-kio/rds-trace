FROM public.ecr.aws/docker/library/node:18.20.2-alpine AS base-stage

ARG TURBO_TEAM
ENV TURBO_TEAM="${TURBO_TEAM}"

ARG TURBO_TOKEN
ENV TURBO_TOKEN="${TURBO_TOKEN}"

ARG TURBO_API
ENV TURBO_API="${TURBO_API}"

RUN apk add git util-linux
RUN --mount=type=secret,id=ghe_token echo -n "https://`cat /run/secrets/ghe_token`:@ghe.misosiru.io" > ~/.git-credentials
RUN git config --global credential.helper store
WORKDIR /
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY app/package.json ./app/

RUN npm i -g pnpm@9.6.0
RUN pnpm install --ignore-scripts
COPY . .

FROM base-stage as app

ARG build_id
WORKDIR /app
RUN export BUILD_ID=${build_id} && pnpm turbo build
CMD pnpm start -p 80
