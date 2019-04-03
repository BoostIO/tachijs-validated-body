import { handlerParam } from 'tachijs'
import { transformAndValidate } from 'class-transformer-validator'

export function validatedBody() {
  return handlerParam((req, res, next, meta) => {
    if (meta.paramType === Object) {
      return req.body
    }
    return transformAndValidate(meta.paramType, req.body)
  })
}
export default validatedBody
