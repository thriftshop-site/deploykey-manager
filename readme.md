# Thriftshop Deploy Key Manager

## Development

- cp .env.example .env

- edit .env

```toml
GITHUB_ACCESS_TOKEN=
```

- [Create A New Personal Access Token](https://github.com/settings/tokens/new?scopes=admin:public_key)

example success response
```js
{
    "data": {
        "id": 47801810,
        "key": "ssh-rsa SOMERANDOMSTRING",
        "url": "https://api.github.com/user/keys/47801810",
        "title": "example.thriftshop.site",
        "verified": true,
        "created_at": "2020-11-14T09:06:12Z",
        "read_only": false
    }
}
```

 example error message

```json
HttpError: Validation Failed: {"resource":"PublicKey","code":"custom","field":"key","message":"key is already in use"}
```

## Deploy
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/thriftshop-site/deploykey-manager)

## Set Your Domain In Netlify

- Go to [Settings](https://app.netlify.com/sites/tss-test/settings/general)

- Click Change Site Name `tss-fn-deploykey-manager.thriftshop.site`

## Production

- make post request with Needed *payload* to `tss-fn-deploykey-manager.thriftshop.site/api`
