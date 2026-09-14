#!/usr/bin/env node
/* Accountability Guild — publish a social card to the FB Page and/or Instagram.
 *
 * Reads credentials from secrets/meta-credentials.json (gitignored, never committed).
 * Image must be a public URL (Instagram's API fetches it server-side) — the
 * ag-content-pipeline repo's raw.githubusercontent.com URLs satisfy this.
 *
 *   node post_to_meta.js --test
 *     Confirms the stored token is valid (GETs the Page name). No posting.
 *
 *   node post_to_meta.js --image <url> --caption "..." --channels facebook,instagram
 *     Posts the image + caption to the listed channels. Prints the live
 *     permalink(s) on success.
 *
 * Flags:
 *   --image      required (unless --test): public URL of the PNG/JPEG to post
 *   --caption    required (unless --test): full post caption, hashtags included
 *   --channels   default "facebook,instagram"
 *   --test       GET the Page name to confirm the token works; no posting
 */
const fs = require('fs');
const path = require('path');

const CREDS_PATH = path.join(__dirname, '..', 'secrets', 'meta-credentials.json');
if (!fs.existsSync(CREDS_PATH)) {
  console.error(`Missing ${CREDS_PATH} — run the token setup first.`);
  process.exit(1);
}
const creds = JSON.parse(fs.readFileSync(CREDS_PATH, 'utf8'));
const GRAPH = 'https://graph.facebook.com/v26.0';

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) { out[key] = next; i++; }
      else out[key] = true;
    }
  }
  return out;
}
const args = parseArgs(process.argv.slice(2));

async function graphPost(nodeId, params) {
  const url = `${GRAPH}/${nodeId}`;
  const body = new URLSearchParams({ ...params, access_token: creds.page_access_token });
  const res = await fetch(url, { method: 'POST', body });
  const json = await res.json();
  if (json.error) throw new Error(`Graph API error on ${nodeId}: ${json.error.message} (code ${json.error.code})`);
  return json;
}

async function graphGet(nodeId, fields) {
  const url = `${GRAPH}/${nodeId}?fields=${encodeURIComponent(fields)}&access_token=${encodeURIComponent(creds.page_access_token)}`;
  const res = await fetch(url);
  const json = await res.json();
  if (json.error) throw new Error(`Graph API error on ${nodeId}: ${json.error.message} (code ${json.error.code})`);
  return json;
}

async function testAuth() {
  const page = await graphGet(creds.facebook_page_id, 'name,followers_count');
  console.log(`OK — token valid. Page: "${page.name}" (${page.followers_count ?? '?'} followers)`);
  const ig = await graphGet(creds.instagram_business_account_id, 'username,followers_count');
  console.log(`OK — Instagram: @${ig.username} (${ig.followers_count ?? '?'} followers)`);
}

async function postFacebook(imageUrl, caption) {
  const created = await graphPost(`${creds.facebook_page_id}/photos`, { url: imageUrl, caption });
  const info = await graphGet(created.post_id || created.id, 'permalink_url');
  return info.permalink_url;
}

async function postInstagram(imageUrl, caption) {
  const container = await graphPost(`${creds.instagram_business_account_id}/media`, { image_url: imageUrl, caption });
  const published = await graphPost(`${creds.instagram_business_account_id}/media_publish`, { creation_id: container.id });
  const info = await graphGet(published.id, 'permalink');
  return info.permalink;
}

async function main() {
  if (args.test) { await testAuth(); return; }
  if (!args.image || !args.caption) {
    console.error('Usage: node post_to_meta.js --image <url> --caption "..." [--channels facebook,instagram]');
    process.exit(1);
  }
  const channels = (args.channels || 'facebook,instagram').split(',').map((s) => s.trim());
  const results = {};
  if (channels.includes('facebook')) {
    results.facebook = await postFacebook(args.image, args.caption);
    console.log('Facebook  ->', results.facebook);
  }
  if (channels.includes('instagram')) {
    results.instagram = await postInstagram(args.image, args.caption);
    console.log('Instagram ->', results.instagram);
  }
}
main().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
