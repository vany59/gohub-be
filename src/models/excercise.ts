import { Entity, Column, ObjectIdColumn } from "typeorm";
import { Expose, plainToClass } from "class-transformer";
import * as uuid from "uuid";

@Entity()
export class Excercise {
  @ObjectIdColumn()
  @Expose()
  _id: string;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  link: string;

  @Column()
  @Expose()
  createdAt: number;

  @Column()
  @Expose()
  updatedAt: number;

  constructor(excercise: Partial<Excercise>) {
    if (excercise) {
      Object.assign(
        this,
        plainToClass(Excercise, excercise, {
          excludeExtraneousValues: true
        })
      );
      this._id = this._id || uuid.v4();
      this.createdAt = this.createdAt || +new Date();
      this.updatedAt = +new Date();
    }
  }
}
