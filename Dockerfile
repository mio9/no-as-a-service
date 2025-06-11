# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1-alpine AS base
WORKDIR /app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production


# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=install /temp/prod/package.json package.json
COPY src ./src

# run the app
USER bun

ENV PORT=13300
ENV TRUST_PROXY=true
ENV OLLAMA_URL=http://localhost:11434
ENV OLLAMA_MODEL=gemma3:4b

EXPOSE 13300/tcp
ENTRYPOINT [ "bun", "run", "src/index.ts" ]