/**
 * CommonJS launcher for the ES module server.js.
 * Use this as the iisnode entry file if the host has trouble running server.js (ESM) directly.
 * Keeps the process alive because server.js calls app.listen().
 */
(async () => {
  await import('./server.js');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
