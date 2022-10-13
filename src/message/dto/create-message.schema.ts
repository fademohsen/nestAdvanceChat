import * as joit from 'joi';

export const createMessageSchema = joit.object({
    
    room: joit.string().required(),
    peer1: joit.string().required(),
    peer2: joit.string().required(),
    content: joit.string().required(),

});
