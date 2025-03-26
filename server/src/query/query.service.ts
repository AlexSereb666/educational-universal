import { Injectable } from '@nestjs/common';
import { Model, ModelCtor, Sequelize } from 'sequelize-typescript';

@Injectable()
export class QueryService {
    constructor(private readonly sequelize: Sequelize) {}

    async executeQuery(sql: string) {
        try {
            if (!/^\s*SELECT\s+/i.test(sql.trim())) {
                throw new Error('Допустимы запросы только на вывод данных');
            }

            const [results] = await this.sequelize.query(sql);
            return results;
        } catch (error) {
            return { error: error.message };
        }
    }

    async getSchema() {
        try {
            const models = this.sequelize.models;
            const schema: Record<string, any> = {};

            for (const modelName in models) {
                const model: ModelCtor<Model<any, any>> = models[modelName] as ModelCtor<
                    Model<any, any>
                >; // Приводим к правильному типу
                const associations = model.associations;

                schema[modelName] = {
                    attributes: Object.keys(model.rawAttributes),
                    associations: Object.keys(associations).map((assoc) => ({
                        association: assoc,
                        type: associations[assoc].associationType,
                        targetModel: associations[assoc].target.name,
                    })),
                };
            }

            return schema;
        } catch (error) {
            return { error: error.message };
        }
    }
}
