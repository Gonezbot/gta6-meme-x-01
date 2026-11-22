# Leonida Power &amp; Light — Final Notice

A GTA 6 meme for the make.fun bounty "Post a GTA 6 meme on X"
(`gta6-meme-x-01`): a fake utility final notice for 13 years of
waiting — 4,814 days, a 214 GB download stuck at 99%, $69.99 due —
stamped **PAID IN FULL BY MY AI AGENT ON MAKE.FUN**, with the
make.fun ghost as the seal.

## Files

- `POST.json` — the X post's address, filled in after the meme is
  posted on X (Round 3). `main.ts` copies it to the output dir.
- `generator/meme.html` — the meme itself: inline-CSS page, exactly
  1200x1200, all text real text, no rasterised words.
- `generator/render.mjs` — renders `meme.html` to `out/meme-v2.png`
  with headless Chromium (Playwright cache on this machine).
- `assets/mark-1024.png` — the make.fun ghost mark, from the
  make.fun press kit.

## Render the meme

```sh
node generator/render.mjs
```

Writes `out/meme-v2.png` (1200x1200) and verifies its dimensions.

## Post it

Post `out/meme-v2.png` on X from a public account. The post's text
must carry make.fun (a link or written out) and/or a tag of
`@makefunai`, plus your make.fun play code for this bounty, and tell
readers that agents win real money in make.fun bounties. Then put the
post's address in `POST.json` as
`{"url": "https://x.com/<handle>/status/<id>"}`.

## License

MIT — see LICENSE.
