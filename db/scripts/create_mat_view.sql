-- 2021 --
create materialized view bills_jan_2021 as
select consumer_id,
       sum(dc.power) * 2.5              as bill,
       date(now())                      as created_at,
       date(now() + interval '30 days') as due_date,
       text('JANUARY')                  as month_str
from daily_consumptions dc
         left outer join devices d on dc.device_id = d.id
         left outer join consumers c on d.consumer_id = c.id
where d.is_active = true
  and dc.created_at >= '2021-01-01'
  and dc.created_at <= '2021-02-01'
group by consumer_id;

create materialized view bills_feb_2021 as
select consumer_id,
       sum(dc.power) * 2.5              as bill,
       date(now())                      as created_at,
       date(now() + interval '30 days') as due_date,
       text('FEBRUARY')                 as month_str
from daily_consumptions dc
         left outer join devices d on dc.device_id = d.id
         left outer join consumers c on d.consumer_id = c.id
where d.is_active = true
  and dc.created_at >= '2021-02-01'
  and dc.created_at <= '2021-03-01'
group by consumer_id;

create materialized view bills_mar_2021 as
select consumer_id,
       sum(dc.power) * 2.5              as bill,
       date(now())                      as created_at,
       date(now() + interval '30 days') as due_date,
       text('MARCH')                    as month_str
from daily_consumptions dc
         left outer join devices d on dc.device_id = d.id
         left outer join consumers c on d.consumer_id = c.id
where d.is_active = true
  and dc.created_at >= '2021-03-01'
  and dc.created_at <= '2021-04-01'
group by consumer_id;

create materialized view bills_apr_2021 as
select consumer_id,
       sum(dc.power) * 2.5              as bill,
       date(now())                      as created_at,
       date(now() + interval '30 days') as due_date,
       text('APRIL')                    as month_str
from daily_consumptions dc
         left outer join devices d on dc.device_id = d.id
         left outer join consumers c on d.consumer_id = c.id
where d.is_active = true
  and dc.created_at >= '2021-04-01'
  and dc.created_at <= '2021-05-01'
group by consumer_id;

create materialized view bills_may_2021 as
select consumer_id,
       sum(dc.power) * 2.5              as bill,
       date(now())                      as created_at,
       date(now() + interval '30 days') as due_date,
       text('MAY')                      as month_str
from daily_consumptions dc
         left outer join devices d on dc.device_id = d.id
         left outer join consumers c on d.consumer_id = c.id
where d.is_active = true
  and dc.created_at >= '2021-05-01'
  and dc.created_at <= '2021-06-01'
group by consumer_id;

create materialized view bills_jun_2021 as
select consumer_id,
       sum(dc.power) * 2.5              as bill,
       date(now())                      as created_at,
       date(now() + interval '30 days') as due_date,
       text('JUNE')                     as month_str
from daily_consumptions dc
         left outer join devices d on dc.device_id = d.id
         left outer join consumers c on d.consumer_id = c.id
where d.is_active = true
  and dc.created_at >= '2021-06-01'
  and dc.created_at <= '2021-07-01'
group by consumer_id;

create materialized view bills_jul_2021 as
select consumer_id,
       sum(dc.power) * 2.5              as bill,
       date(now())                      as created_at,
       date(now() + interval '30 days') as due_date,
       text('JULY')                     as month_str
from daily_consumptions dc
         left outer join devices d on dc.device_id = d.id
         left outer join consumers c on d.consumer_id = c.id
where d.is_active = true
  and dc.created_at >= '2021-07-01'
  and dc.created_at <= '2021-08-01'
group by consumer_id;

create materialized view bills_aug_2021 as
select consumer_id,
       sum(dc.power) * 2.5              as bill,
       date(now())                      as created_at,
       date(now() + interval '30 days') as due_date,
       text('AUGUST')                   as month_str
from daily_consumptions dc
         left outer join devices d on dc.device_id = d.id
         left outer join consumers c on d.consumer_id = c.id
where d.is_active = true
  and dc.created_at >= '2021-08-01'
  and dc.created_at <= '2021-09-01'
group by consumer_id;

create materialized view bills_sep_2021 as
select consumer_id,
       sum(dc.power) * 2.5              as bill,
       date(now())                      as created_at,
       date(now() + interval '30 days') as due_date,
       text('SEPTEMBER')                as month_str
from daily_consumptions dc
         left outer join devices d on dc.device_id = d.id
         left outer join consumers c on d.consumer_id = c.id
where d.is_active = true
  and dc.created_at >= '2021-09-01'
  and dc.created_at <= '2021-10-01'
group by consumer_id;

create materialized view bills_oct_2021 as
select consumer_id,
       sum(dc.power) * 2.5              as bill,
       date(now())                      as created_at,
       date(now() + interval '30 days') as due_date,
       text('OCTOBER')                  as month_str
from daily_consumptions dc
         left outer join devices d on dc.device_id = d.id
         left outer join consumers c on d.consumer_id = c.id
where d.is_active = true
  and dc.created_at >= '2021-10-01'
  and dc.created_at <= '2021-11-01'
group by consumer_id;

create materialized view bills_nov_2021 as
select consumer_id,
       sum(dc.power) * 2.5              as bill,
       date(now())                      as created_at,
       date(now() + interval '30 days') as due_date,
       text('NOVEMBER')                 as month_str
from daily_consumptions dc
         left outer join devices d on dc.device_id = d.id
         left outer join consumers c on d.consumer_id = c.id
where d.is_active = true
  and dc.created_at >= '2021-11-01'
  and dc.created_at <= '2021-12-01'
group by consumer_id;

create materialized view bills_dec_2021 as
select consumer_id,
       sum(dc.power) * 2.5              as bill,
       date(now())                      as created_at,
       date(now() + interval '30 days') as due_date,
       text('DECEMBER')                 as month_str
from daily_consumptions dc
         left outer join devices d on dc.device_id = d.id
         left outer join consumers c on d.consumer_id = c.id
where d.is_active = true
  and dc.created_at >= '2021-12-01'
  and dc.created_at <= '2022-01-01'
group by consumer_id;

-----------------------------------------------------------------------------------
create unique index on bills_jan_2021 (consumer_id, created_at, due_date);
REFRESH MATERIALIZED VIEW CONCURRENTLY bills_jan_2021;

create unique index on bills_feb_2021 (consumer_id, created_at, due_date);
REFRESH MATERIALIZED VIEW CONCURRENTLY bills_feb_2021;

create unique index on bills_mar_2021 (consumer_id, created_at, due_date);
REFRESH MATERIALIZED VIEW CONCURRENTLY bills_mar_2021;

create unique index on bills_apr_2021 (consumer_id, created_at, due_date);
REFRESH MATERIALIZED VIEW CONCURRENTLY bills_apr_2021;

create unique index on bills_may_2021 (consumer_id, created_at, due_date);
REFRESH MATERIALIZED VIEW CONCURRENTLY bills_may_2021;

create unique index on bills_jun_2021 (consumer_id, created_at, due_date);
REFRESH MATERIALIZED VIEW CONCURRENTLY bills_jun_2021;

create unique index on bills_jul_2021 (consumer_id, created_at, due_date);
REFRESH MATERIALIZED VIEW CONCURRENTLY bills_jul_2021;

create unique index on bills_aug_2021 (consumer_id, created_at, due_date);
REFRESH MATERIALIZED VIEW CONCURRENTLY bills_aug_2021;

create unique index on bills_sep_2021 (consumer_id, created_at, due_date);
REFRESH MATERIALIZED VIEW CONCURRENTLY bills_sep_2021;

create unique index on bills_oct_2021 (consumer_id, created_at, due_date);
REFRESH MATERIALIZED VIEW CONCURRENTLY bills_oct_2021;

create unique index on bills_nov_2021 (consumer_id, created_at, due_date);
REFRESH MATERIALIZED VIEW CONCURRENTLY bills_nov_2021;

create unique index on bills_dec_2021 (consumer_id, created_at, due_date);
REFRESH MATERIALIZED VIEW CONCURRENTLY bills_dec_2021;
