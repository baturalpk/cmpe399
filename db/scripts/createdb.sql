CREATE TABLE consumers (
    id              BIGSERIAL PRIMARY KEY ,
    email           varchar NOT NULL ,
    password        varchar NOT NULL ,
    full_name       varchar NOT NULL ,
    phone           bigint  NOT NULL
);

CREATE TABLE devices (
    id                      BIGSERIAL PRIMARY KEY ,
    consumer_id             bigint  REFERENCES consumers(id),
    brand                   varchar NOT NULL ,
    model                   varchar NOT NULL ,
    date_of_registration    date    NOT NULL ,
    is_active               boolean NOT NULL
);

CREATE TABLE daily_consumptions (
    id              BIGSERIAL PRIMARY KEY ,
    device_id       bigint REFERENCES devices(id) ,
    power           double precision NOT NULL ,
    created_at      date NOT NULL
);

 CREATE TABLE addresses (
     id                 BIGSERIAL PRIMARY KEY ,
     street             varchar NOT NULL ,
     additional_info    varchar NULL ,
     postal_code        int     NOT NULL ,
     city               varchar NOT NULL ,
     state              varchar NULL ,
     country            varchar NOT NULL
 );

CREATE TABLE consumer_addresses (
    consumer_id bigint REFERENCES consumers(id),
    address_id  bigint REFERENCES addresses(id),
    PRIMARY KEY ( consumer_id, address_id )
);

CREATE TABLE device_addresses (
    device_id   bigint REFERENCES devices(id) ,
    address_id  bigint REFERENCES addresses(id),
    PRIMARY KEY ( device_id, address_id )
);
