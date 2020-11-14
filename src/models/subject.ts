import { Entity, Column, ObjectIdColumn } from "typeorm";
import { Expose, plainToClass } from "class-transformer";
import * as uuid from "uuid";

@Entity()
export class Subject {
  @ObjectIdColumn()
  @Expose()
  _id: string;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  idExercise: string[];

  @Column()
  @Expose()
  class: string;

  @Column()
  @Expose()
  createdAt: number;

  @Column()
  @Expose()
  updatedAt: number;

  constructor(subject: Partial<Subject>) {
    if (subject) {
      Object.assign(
        this,
        plainToClass(Subject, subject, {
          excludeExtraneousValues: true
        })
      );
      this._id = this._id || uuid.v4();
      this.createdAt = this.createdAt || +new Date();
      this.updatedAt = +new Date();
    }
  }
}
