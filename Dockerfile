# The hotel's web front: the website (packages/cms) at / and the client (packages/client-next) at /client/, as static
# files. The client is built for the deployed hotel: served under /client/, and reading other sites through the
# server's asset mirror rather than a dev server. Only the client and its runtime go in: no editor.
FROM node:24-alpine AS build
WORKDIR /repo

# the manifests alone first: the install is a layer of its own, cached until a dependency changes, rather than
# installed again for every change to the code
COPY package.json package-lock.json tsconfig.base.json ./
COPY packages/runtime/package.json packages/runtime/
COPY packages/client-next/package.json packages/client-next/
COPY packages/cms/package.json packages/cms/
RUN npm ci --ignore-scripts --include-workspace-root \
      --workspace packages/runtime --workspace packages/client-next --workspace packages/cms

COPY packages/runtime packages/runtime
COPY packages/client-next packages/client-next
COPY packages/cms packages/cms
# a bounded heap: the runner builds the server image on the same machine
ENV NODE_OPTIONS=--max-old-space-size=3072
RUN cd packages/cms && npx tsc --noEmit -p . && npx vite build
RUN cd packages/client-next && CLIENT_BASE=/client/ VITE_REMOTE_READS=mirror npx vite build

FROM nginxinc/nginx-unprivileged:1.29-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/packages/cms/dist /usr/share/nginx/html
COPY --from=build /repo/packages/client-next/dist /usr/share/nginx/html/client
EXPOSE 8080
