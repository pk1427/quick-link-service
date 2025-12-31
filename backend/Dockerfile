FROM denoland/deno:1.40.0

WORKDIR /app

# Copy application files
COPY . .

# Cache dependencies
RUN deno cache src/server.ts

EXPOSE 8000

CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-write", "--allow-env", "src/server.ts"]