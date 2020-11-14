import { Entity, Column, ObjectIdColumn } from "typeorm";
import { Expose, plainToClass } from "class-transformer";
import * as uuid from "uuid";

enum userType {
  student,
  teacher
}
@Entity({ name: "accounts" })
export class User {
  @ObjectIdColumn()
  @Expose()
  _id: string;

  @Column()
  @Expose()
  username: string;

  @Column()
  @Expose()
  password: string;

  @Column()
  @Expose()
  email: string;

  @Column()
  @Expose()
  phone: string;

  @Column()
  @Expose()
  avatar: string;

  @Column()
  @Expose()
  isRoot: boolean;

  @Column()
  @Expose()
  role: string;

  @Column()
  @Expose()
  type: userType;

  @Column()
  @Expose()
  idCourse: string;

  @Column()
  @Expose()
  idSubject: string[];

  @Column()
  @Expose()
  idExercise: string[];

  @Column()
  @Expose()
  createdAt: number;

  @Column()
  @Expose()
  updatedAt: number;

  constructor(user: Partial<User>) {
    if (user) {
      Object.assign(
        this,
        plainToClass(User, user, {
          excludeExtraneousValues: true
        })
      );
      this._id = this._id || uuid.v1();
      this.isRoot = false;
      this.createdAt = this.createdAt || +new Date();
      this.updatedAt = +new Date();
    }
  }
}
