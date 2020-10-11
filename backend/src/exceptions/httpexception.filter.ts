import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const exceptionResponse = exception.getResponse()
    const status = exception.getStatus()

    if (exception instanceof BadRequestException) {
      return this.handleBadRequestException(exceptionResponse, response)
    }

    return response.status(status).json({ success: false, message: exception.message })
  }
  /**
   *
   * @param exceptionResponse
   * @param response
   */
  private handleBadRequestException(exceptionResponse: string | object, response: Response<any>) {
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

    return response
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({ success: false, message: 'The form has errors', errors })
  }
}
