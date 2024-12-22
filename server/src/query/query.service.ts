import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class QueryService {
    constructor(private readonly sequelize: Sequelize) {}

    async executeQuery(sql: string) {
        try {
            if (!/^\s*SELECT\s+/i.test(sql.trim())) {
                throw new Error('Допустимы запросы только на вывод данных');
            }

            const [ results ] = await this.sequelize.query(sql);
            return results;
        } catch (error) {
            return { error: error.message };
        }
    }
}
