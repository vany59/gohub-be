import { Entity, Column, ObjectIdColumn } from "typeorm";
import { Expose, plainToClass } from "class-transformer";
import * as uuid from "uuid";

@Entity({name: 'provinces'})
export class Province {
  @ObjectIdColumn()
  @Expose()
  _id: string;

  @Column()
  @Expose()
  label: string;

  @Column()
  @Expose()
  value: number;

  constructor(province: Partial<Province>) {
    if (province) {
      Object.assign(
        this,
        plainToClass(Province, province, {
          excludeExtraneousValues: true,
        })
      );
      this._id = this._id || uuid.v1();
      // this.createdAt = this.createdAt || +new Date();
      // this.updatedAt = +new Date();
    }
  }
}
