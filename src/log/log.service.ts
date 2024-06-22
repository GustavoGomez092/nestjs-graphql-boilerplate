import { Injectable } from '@nestjs/common';
import { EntitiesDictionary } from 'src/utils/entities.dictionary';

export interface ILog {
  entity: EntitiesDictionary;
  action: string;
  info: any;
}

@Injectable()
export class LogService {
  constructor() {}

  log(message: ILog) {
    console.log(`${message.entity}.${message.action}`, message.info);
  }
}
