import joi from "joi";

const userValidationSchema = joi.object({
    username:joi.string().min(3).max(30).required(),
    email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','in'] } }).pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/).required(),
    password:joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required()
})

export {userValidationSchema}