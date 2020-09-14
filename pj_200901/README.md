# pj_200727

## nuxt Build Setup

[Nuxt.js docs](https://nuxtjs.org).

```bash
# nuxt project 설치

$ yarn create nuxt-app <project-name>
$ cd <project-name>
$ yarn dev

# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## package.json 추가 부분

```bash
  "__localhost:3000__": "아래의 config: {...} 를 삽입한다.",
  "config": {
    "nuxt": {
      "host": "192.168.0.42",
      "port": "3200"
    }
  },

  "scripts": {
    "__npm run dev__": "실행명령어",
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start",
    "export": "nuxt export",
    "serve": "nuxt serve",
    "generate": "nuxt generate",
    "__firebase:deploy__": "public폴더에 제너레이터 후 firebase로 전송 : https://www.youtube.com/watch?v=pwrey4nBukc&list=PLjpTKic1SLZvBvavJOeQeIFVvJKrm49II&index=11",
    "firebase:deploy": "nuxt generate && firebase deploy",
    "firebase:hosting": "nuxt generate && firebase deploy --only hosting",
    "firebase:functions": "firebase serve --only functions"
  },  
```  