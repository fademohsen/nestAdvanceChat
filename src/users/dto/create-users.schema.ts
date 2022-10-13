import * as joit from 'joi';

export const createUsersSchema = joit.object({
    name: joit.string().required(),
    email: joit.string().required(),
    password: joit.string().required(),
    mobileNumber: joit.string().required(),
});
