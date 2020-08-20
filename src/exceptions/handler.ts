import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    const exceptionResponse = exception.getResponse()
    const messages = exceptionResponse['message']
    const errors = {}
    messages.forEach(msg => {
      const field = msg.split(' ')[0].toLowerCase()
      if (!errors.hasOwnProperty(field)) {
        errors[field] = []
        errors[field].push(msg)
      } else {
        errors[field].push(msg)
      }
    })

    return response.status(422).json({ success: false, message: 'The form has errors', errors })
  }
}
