import { ValidatorConstraint } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ExistValidator } from '../utils/validator/abstract-exist-validator';

@ValidatorConstraint({ name: 'exist', async: true })
@Injectable()
export class Exist extends ExistValidator {
  constructor(@InjectConnection() protected readonly connection: Connection) {
    super(connection);
  }
}