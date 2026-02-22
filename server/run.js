/**
 * Launcher for server.js (ES module). Use this as the iisnode entry if .cjs is blocked on the host.
 */
(async () => {
  await import('./server.js');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
