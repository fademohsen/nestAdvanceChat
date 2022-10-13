import * as joit from 'joi';

export const createUnitSchema = joit.object({
    name: joit.string().required(),
});
