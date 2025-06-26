/*
this file is for interface 

*/ 

export type PostType = {
    id: string,
    title : string ,
    body : string ,
    user : UserType ,
}                    

export type UserType = {
    _id : string ,
    name : string ,
    photo : string ,
}