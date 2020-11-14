import { Entity, Column, ObjectIdColumn } from "typeorm";
import { Expose, plainToClass } from "class-transformer";
import * as uuid from "uuid";

@Entity({ name: "privileges" })
export class Privilege {
  @ObjectIdColumn()
  @Expose()
  _id: string;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  createdAt: number;

  @Column()
  @Expose()
  updatedAt: number;

  constructor(privilege: Partial<Privilege>) {
    if (privilege) {
      Object.assign(
        this,
        plainToClass(Privilege, privilege, {
          excludeExtraneousValues: true
        })
      );
      this._id = this._id || uuid.v1();
      this.createdAt = this.createdAt || +new Date();
      this.updatedAt = +new Date();
    }
  }
}
