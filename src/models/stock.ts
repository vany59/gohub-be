import { Entity, Column, ObjectIdColumn } from "typeorm";
import { Expose, plainToClass } from "class-transformer";
import * as uuid from "uuid";
import { IsNotEmpty } from "class-validator";

@Entity({ name: "stocks" })
export class Stock {
  @ObjectIdColumn()
  @Expose()
  _id: string;

  @Column()
  @Expose()
  @IsNotEmpty()
  name: string;

  @Column()
  @Expose()
  @IsNotEmpty()
  description: string;

  @Column()
  @Expose()
  @IsNotEmpty()
  price: string;

  @Column()
  @Expose()
  @IsNotEmpty()
  image: string;

  @Column()
  @Expose()
  createdAt: number;

  @Column()
  @Expose()
  updatedAt: number;

  constructor(stock: Partial<Stock>) {
    if (stock) {
      Object.assign(
        this,
        plainToClass(Stock, stock, {
          excludeExtraneousValues: true
        })
      );
      this._id = this._id || uuid.v1();
      this.createdAt = this.createdAt || +new Date();
      this.updatedAt = +new Date();
    }
  }
}
