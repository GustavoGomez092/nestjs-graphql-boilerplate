import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { LogGuard } from './log.guard';
import { EntitiesDictionary } from 'src/utils/entities.dictionary';
import { ActionsDictionary } from 'src/utils/actions.dictionary';

export interface ILogHeaders {
  entity: EntitiesDictionary;
  action: ActionsDictionary;
}

export const LOGS_KEY = 'logs';

export const Log = (args: ILogHeaders) => {
  return applyDecorators(SetMetadata(LOGS_KEY, args), UseGuards(LogGuard));
};
