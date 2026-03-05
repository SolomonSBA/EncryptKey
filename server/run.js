/**
 * Launcher for server.js (ES module). Use as iisnode entry (run.js, not run.cjs).
 */
(async () => {
  await import('./server.js');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
