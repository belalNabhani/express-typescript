create table users (
    id uuid DEFAULT uuid_generate_v4 (),
    email varchar unique,
    password varchar,
    first_name varchar,
    last_name varchar,
    active boolean default true,
    PRIMARY key (id)
);