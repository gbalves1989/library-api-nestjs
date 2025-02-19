import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { paginator, PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { Category } from '@prisma/client';

const paginate: PaginatorTypes.PaginateFunction = paginator({
  perPage: Number(process.env.PER_PAGE),
});

@Injectable()
export class FindAllRepository {
  constructor(private prisma: DatabaseService) {}

  async findAll({
    page,
  }: {
    page?: number;
  }): Promise<PaginatorTypes.PaginatedResult<Category>> {
    return paginate(this.prisma.category, {
      skip: page,
      select: {
        id: true,
        name: true,
      },
    });
  }
}
