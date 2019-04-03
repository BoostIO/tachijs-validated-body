# TachiJS validated body

[![Build Status](https://travis-ci.com/BoostIO/tachijs-validated-body.svg?branch=master)](https://travis-ci.com/BoostIO/tachijs-validated-body)
[![codecov](https://codecov.io/gh/BoostIO/tachijs-validated-body/branch/master/graph/badge.svg)](https://codecov.io/gh/BoostIO/tachijs-validated-body)
[![NPM download](https://img.shields.io/npm/dm/tachijs-validated-body.svg)](https://www.npmjs.com/package/tachijs)
[![Supported by BoostIO](https://github.com/BoostIO/boostio-materials/raw/master/v1/boostio-shield-v1.svg?sanitize=true)](https://boostio.co)

Validate body with class validator!

## How to use

Install peer dependencies.

```sh
npm i reflect-metadata class-validator class-transformer-validator class-transformer
```

Replace `@reqBody()` with `@validatedBody()`.

```ts
import { validatedBody } from 'tachijs-validated-body'

class MessageRequestBodyDTO {
  @IsString()
  message: string
}

@controller('/')
class EchoController {
  @httpPost('/')
  // echo(@reqBody() body: unknown) {
  echo(@validatedBody() body: MessageRequestBodyDTO) {
    return body.message
  }
}
```

## License

MIT © Junyoung Choi
