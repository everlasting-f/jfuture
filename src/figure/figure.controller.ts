import {
  Body,
  Controller,
  Headers,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PutOrderOne, UpdateFirstinformation, UpdateOneMessage, UpdateOtherFormation } from './figure.interface';
import { FigureService } from './figure.service';

@Controller('figure')
export class FigureController {
  log = 'AuthController';
  // 向数据库put一个订单
  //   constructor(private authService: AuthService) {}
  @Post('/putorder')
  putOrder(@Body(ValidationPipe) data: PutOrderOne, @Headers() headers) {
    console.log('FigureController putOrder start');
    let idtoken = headers['authorization'];
    let authdata = AuthService.decodeIdtoken(idtoken);
    return FigureService.putOrder(data, {
      hash: authdata.hash,
      range: authdata.range,
      index: authdata.range,
    });
  }

  /**
   * 向数据库更新其他信息（面积  实际费用）
   * @param data 
   */
  @Post('/firstinformation')
  firstinformationController(@Body(ValidationPipe) data:UpdateFirstinformation) {
    return  FigureService.firstinformation(data);
  }


  /**
   * 更新其他信息
   * @param data 
   */
  @Post('other_information')
  otherInformation(@Body(ValidationPipe) data: UpdateOtherFormation) {
    return FigureService.otherInformation(data)
  }

  /**
   * 更新order表中的一个数据
   * @param data 
   */
  @Post('/one_message')
  oneMessage(@Body(ValidationPipe) data: UpdateOneMessage) {
    return FigureService.updateOneMessage(data)
  }

  /**
   * 更新任务的时间信息
   * @param data 
   */
  @Post('/update_time')
  updateTime(@Body(ValidationPipe) data) {
    return FigureService.updateTime();
  }
}
