# IPFS hosting

> Playground exploring various ways of automating deployment of a static website to IPFS.

[![js ascribe](https://img.shields.io/badge/js-ascribe-39BA91.svg)](https://github.com/ascribe/javascript)

file | description
--   | --
[`deploy.sh`](deploy.sh) | Simple bash script using locally installed ipfs daemon
[`deploy.js`](deploy.js) | Deploy from Node.js via [js-ipfs-api](https://github.com/ipfs/js-ipfs-api) & [js-ipfs](https://github.com/ipfs/js-ipfs)

## Scope

Every way needs to go from build output to live:

- add `dist/` folder and contents to IPFS
- output the final IPFS url
- write IPFS hash into `versions/current` and add to `versions/history`
- DNS either via IPNS or DNS provider API calls
- consider to be run in a CI context

### DNS settings

```
CNAME: `subdomain.domain.com` -> `gateway.ipfs.io`
TXT: `_dnslink.subdomain.domain.com` -> `dnslink=/ipns/<peer_id>`
```

## Further reading

- [`github:ipfs/examples/websites`: A short guide to hosting your site on ipfs](https://github.com/ipfs/examples/tree/master/examples/websites)

## Authors

- Matthias Kretschmann ([@kremalicious](https://github.com/kremalicious)) - [BigchainDB](https://www.bigchaindb.com)
- Code from the Internet™
