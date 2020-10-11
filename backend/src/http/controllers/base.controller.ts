import { HttpStatus } from '@nestjs/common'
import { Response } from 'express'

export class BaseController {
  /**
   * Send success response in json format with status code..
   * @param res
   * @param message
   * @param data
   * @param code
   *
   * @returns Response
   */
  sendSuccessResponse(res: Response, message: string, data: any = [], code: number = HttpStatus.OK): Response {
    return res.status(code).json({
      success: true,
      message,
      data,
    })
  }

  /**
   * Send error response in json format.
   * @param res
   * @param message
   * @param code
   *
   * @returns Response
   */
  sendErrorResponse(res: Response, message: string, code: number = HttpStatus.INTERNAL_SERVER_ERROR): Response {
    return res.status(code).json({
      success: false,
      message,
    })
  }
}
