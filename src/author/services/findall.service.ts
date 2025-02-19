import { Injectable } from '@nestjs/common';
import { FindAllRepository } from '../repositories/findall.repository';

@Injectable()
export class FindAllService {
  constructor(private readonly findAllRepository: FindAllRepository) {}

  async findAll(page: number) {
    return await this.findAllRepository.findAll({ page });
  }
}
