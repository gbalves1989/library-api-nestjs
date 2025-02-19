import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { paginator, PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { Author } from '@prisma/client';

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
  }): Promise<PaginatorTypes.PaginatedResult<Author>> {
    return paginate(this.prisma.author, {
      skip: page,
      select: {
        id: true,
        name: true,
        avatar: true,
      },
    });
  }
}
