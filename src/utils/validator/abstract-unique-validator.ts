import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { Connection, EntitySchema, FindConditions, Not, ObjectType, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

interface UniqueValidationArguments<E> extends ValidationArguments {
  constraints: [
    ObjectType<E> | EntitySchema<E> | string,
    string, // column name
    string // other DTO's property name that will be used to search and skip
  ];
}

export abstract class UniqueValidator implements ValidatorConstraintInterface {
  protected constructor(protected connection: Connection) {
  }

  public async validate<E>(value: string, args: UniqueValidationArguments<E>) {
    let repo = await this.connection.getRepository(args.constraints[0]);

        // @todo: improve this, will be bad if multiple primary keys
        let primaryKey = await repo.metadata.primaryColumns[0].propertyName;

        let query = {};

        query[args.constraints[1]] = value;

        if(args.constraints[2])
            query[primaryKey] = Not((args.object as any)[args.constraints[2]]);

        let count = await repo.count(query);
        return count <= 0;
  }

  public defaultMessage(args: ValidationArguments) {
    const [EntityClass] = args.constraints;
    const entity = EntityClass.name || 'Entity';
    return `A ${this.connection.getRepository(args.constraints[0]).metadata.tableName} with this ${args.constraints[1]} already exists`;
  }
}