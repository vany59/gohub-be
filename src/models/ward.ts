import { Entity, Column, ObjectIdColumn } from "typeorm";
import { Expose, plainToClass } from "class-transformer";
import * as uuid from "uuid";

@Entity({name: 'wards'})
export class Ward {
  @ObjectIdColumn()
  @Expose()
  _id: string;

  @Column()
  @Expose()
  province: string;

  @Column()
  @Expose()
  district: string;

  @Column()
  @Expose()
  label: string;

  @Column()
  @Expose()
  code: number;

  @Column()
  @Expose()
  city_code: number;

  @Column()
  @Expose()
  district_code: number;

  constructor(ward: Partial<Ward>) {
    if (ward) {
      Object.assign(
        this,
        plainToClass(Ward, ward, {
          excludeExtraneousValues: true,
        })
      );
      this._id = this._id || uuid.v1();
      // this.createdAt = this.createdAt || +new Date();
      // this.updatedAt = +new Date();
    }
  }
}
