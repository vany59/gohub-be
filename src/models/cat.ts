import { Entity, Column, ObjectIdColumn } from "typeorm";
import { Expose, plainToClass } from "class-transformer";
import * as uuid from "uuid";

@Entity()
export class Cat {
  @ObjectIdColumn()
  @Expose()
  _id: string;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  newfield: string;

  constructor(cat: Partial<Cat>) {
    if (cat) {
      Object.assign(
        this,
        plainToClass(Cat, cat, {
          excludeExtraneousValues: true,
        })
      );
      this._id = this._id || uuid.v1();
      // this.createdAt = this.createdAt || +new Date();
      // this.updatedAt = +new Date();
    }
  }
}
