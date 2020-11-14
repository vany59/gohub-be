import { Entity, Column, ObjectIdColumn, EntitySchema } from "typeorm";
import { Expose, plainToClass } from "class-transformer";
import * as uuid from "uuid";

class Mission {
  @Column()
  @Expose()
  mission: string;

  @Column()
  @Expose()
  privileges: string[];
}

@Entity({ name: "roles" })
export class Role {
  @ObjectIdColumn()
  @Expose()
  _id: string;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  description: string;

  @Column()
  @Expose()
  missions: Mission[];

  @Column()
  @Expose()
  createdAt: number;

  @Column()
  @Expose()
  updatedAt: number;

  constructor(role: Partial<Role>) {
    if (role) {
      Object.assign(
        this,
        plainToClass(Role, role, {
          excludeExtraneousValues: true
        })
      );
      this._id = this._id || uuid.v1();
      this.createdAt = this.createdAt || +new Date();
      this.updatedAt = +new Date();
    }
  }
}
