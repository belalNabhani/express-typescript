create table posts (
    id serial,
    title varchar not null,
    description text,
    published boolean default false,
    user_id uuid,
    constraint fk_users foreign key (user_id) REFERENCes users(id)
);