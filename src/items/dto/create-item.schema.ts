import * as joit from 'joi';

export const createItemSchema = joit.object({
    name: joit.string().required(),
    description: joit.string().required(),
    qty: joit.number().required(),
    unit: joit.string().required(),
});
