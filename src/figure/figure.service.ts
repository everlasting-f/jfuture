import { Injectable } from '@nestjs/common';
import { map, switchMap } from 'rxjs/operators';
import { DynamoDBService } from 'src/service/dynamodb.serves';
import { DbElasticService } from 'src/service/es.service';
import { FIGURE_CONFIG } from './figure.config';
import uuid = require('uuid');
import { PutOrderOne } from './figure.interface';
import { Dbinterface } from 'src/common/db.elasticinterface';
import { of } from 'rxjs';

@Injectable()
export class FigureService {
  public static logger = 'AuthService';
  public static putOrder(data: PutOrderOne,authkey: Dbinterface) {
    let createIdtoken:PutOrderOne = {
      hash: DynamoDBService.computeHash(FIGURE_CONFIG.INDEX),
      range: uuid.v4(),
      index: FIGURE_CONFIG.INDEX,
      ordername:data.ordername,
      localPlace: data.localPlace,
      type: data.type,
      estimatedMoney:data.estimatedMoney,
      estimatedTime: data.estimatedTime,
      area: data.area,
      creatorkey: authkey,
      // 甲方信息
      ONEinformation: data.ONEinformation,
      timestamp:new Date().valueOf()
    };
    return DbElasticService.executeInEs(
      'PUT',
      FIGURE_CONFIG.INDEX + '/' + FIGURE_CONFIG.DOC + '/' + createIdtoken.range,
      createIdtoken
    ).pipe(
      map((result) => {
        // return result;
        if(result && result._shards && result._shards.successful && result._shards.successful >=1){
          return createIdtoken
        } else {
          let err ={
            code:'000005',
            meaage: 'server_error',
          }
          return err
        }     
      }),
    );
  }

  //   public static getEsdbAuth(userRange: Dbinterface): Observable<any> {
  //     return DbElasticService.executeInEs(
  //       'get',
  //       AUTH_CONFIG.INDEX + '/' + AUTH_CONFIG.DOC + '/' + userRange.range,
  //     ).pipe(
  //       map((result) => {
  //         return result['_source'];
  //       }),
  //     );
  //   }
}