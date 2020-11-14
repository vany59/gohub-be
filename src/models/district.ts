import { Entity, Column, ObjectIdColumn } from "typeorm";
import { Expose, plainToClass } from "class-transformer";
import * as uuid from "uuid";

@Entity({name: 'districts'})
export class District {
  @ObjectIdColumn()
  @Expose()
  _id: string;

  @Column()
  @Expose()
  province: string;

  @Column()
  @Expose()
  label: string;

  @Column()
  @Expose()
  value: number;

  @Column()
  @Expose()
  city_code: number;

  constructor(district: Partial<District>) {
    if (district) {
      Object.assign(
        this,
        plainToClass(District, district, {
          excludeExtraneousValues: true,
        })
      );
      this._id = this._id || uuid.v1();
      // this.createdAt = this.createdAt || +new Date();
      // this.updatedAt = +new Date();
    }
  }
}
