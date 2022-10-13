import * as joit from 'joi';

export const createRoomSchema = joit.object({
    peer1: joit.string().required(),
    peer2: joit.string().required(),
});
