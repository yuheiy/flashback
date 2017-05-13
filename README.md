# フラッシュバック　〜おじさんの記憶〜

## Setup

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
heroku config:set PRISMIC_API_ENDPOINT=SET_YOUR_API
heroku config:set PRISMIC_ACCESS_TOKEN=SET_YOUR_ACCESS_TOKEN
heroku config:set PRISMIC_CUSTOM_TYPE=SET_YOUR_CUSTOM_TYPE
heroku config -s >> .env
```

```bash
yarn
yarn dev
```

## Todo

- [ ] CSS Font Loading / [fontfaceobserver](https://github.com/bramstein/fontfaceobserver)
- [ ] ms edge
- [ ] post preview
- [ ] 記事取得失敗画面
