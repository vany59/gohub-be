import { Entity, Column, ObjectIdColumn } from "typeorm";
import { Expose, plainToClass } from "class-transformer";
import * as uuid from "uuid";

@Entity({ name: "missions" })
export class Mission {
  @ObjectIdColumn()
  @Expose()
  _id: string;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  privileges: string[];

  @Column()
  @Expose()
  createdAt: number;

  @Column()
  @Expose()
  updatedAt: number;

  constructor(mission: Partial<Mission>) {
    if (mission) {
      Object.assign(
        this,
        plainToClass(Mission, mission, {
          excludeExtraneousValues: true
        })
      );
      this._id = this._id || uuid.v1();
      this.createdAt = this.createdAt || +new Date();
      this.updatedAt = +new Date();
    }
  }
}
