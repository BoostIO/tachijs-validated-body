import 'reflect-metadata'
import { tachijs, controller, httpPost, ConfigSetter } from 'tachijs'
import { IsString } from 'class-validator'
import request from 'supertest'
import bodyParser from 'body-parser'
import { ErrorRequestHandler } from 'express'
import validatedBody from '..'

class MessageRequestBodyDTO {
  @IsString()
  message: string
}

const before: ConfigSetter = app => {
  app.use(bodyParser.json())
}

const after: ConfigSetter = app => {
  app.use(((error: Error, req: Express.Request, res, next) => {
    if (Array.isArray(error)) {
      res.status(422).json({ message: error.toString() })
    } else {
      next(error)
    }
  }) as ErrorRequestHandler)
}

describe('validatedBody', () => {
  it('validates body with class validator', async () => {
    // Given
    @controller('/')
    class EchoController {
      @httpPost('/')
      echo(@validatedBody() body: MessageRequestBodyDTO) {
        return body.message
      }
    }
    const app = tachijs({
      before,
      controllers: [EchoController]
    })

    // When
    const response = await request(app)
      .post('/')
      .send({
        message: 'test'
      })

    // Then
    expect(response).toMatchObject({
      status: 200,
      text: 'test'
    })
  })

  it('throws if body is invalidated', async () => {
    // Given
    @controller('/')
    class EchoController {
      @httpPost('/')
      echo(@validatedBody() body: MessageRequestBodyDTO) {
        return body.message
      }
    }
    const app = tachijs({
      before,
      after,
      controllers: [EchoController]
    })

    // When
    const response = await request(app)
      .post('/')
      .send({})

    // Then
    expect(response).toMatchObject({
      status: 422
    })
  })

  it('skips validation and return body directly if paramType is any', async () => {
    // Given
    @controller('/')
    class EchoController {
      @httpPost('/')
      echo(@validatedBody() body: any) {
        return body.message
      }
    }
    const app = tachijs({
      before,
      controllers: [EchoController]
    })

    // When
    const response = await request(app)
      .post('/')
      .send({
        message: 'test'
      })

    // Then
    expect(response).toMatchObject({
      status: 200,
      text: 'test'
    })
  })
})
