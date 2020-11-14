import { Entity, Column, ObjectIdColumn } from "typeorm";
import { Expose, plainToClass } from "class-transformer";
import * as uuid from "uuid";

@Entity()
export class Course {
  @ObjectIdColumn()
  @Expose()
  _id: string;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  idSubject: string[];

  @Column()
  @Expose()
  level: string;

  @Column()
  @Expose()
  createdAt: number;

  @Column()
  @Expose()
  updatedAt: number;

  constructor(course: Partial<Course>) {
    if (course) {
      Object.assign(
        this,
        plainToClass(Course, course, {
          excludeExtraneousValues: true
        })
      );
      this._id = this._id || uuid.v4();
      this.createdAt = this.createdAt || +new Date();
      this.updatedAt = +new Date();
    }
  }
}
