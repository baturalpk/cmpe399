insert into addresses(street, additional_info, postal_code, city, country) -- 1
values ('UND', 'Building C/01', 00000, 'New Castle', 'UK');
insert into addresses(street, additional_info, postal_code, city, country) -- 2
values ('Bereketzade', 'Galata Kulesi', 34421, 'Istanbul', 'TR');
insert into addresses(street, additional_info, postal_code, city, country) -- 3
values ('UND', 'Apartment Z', 00000, 'Seattle', 'US');
insert into addresses(street, additional_info, postal_code, city, country) -- 4
values ('UND', 'B Apartmani', 06000, 'Ankara', 'TR');
insert into addresses(street, additional_info, postal_code, city, country) --5
values ('UND', 'Apt. D', 00000, 'Munich', 'DE');

insert into consumers(email, password, full_name, phone) -- 1
values ('baturalp@email.com', '1234', 'Baturalp KIZILTAN', 5340730708);
insert into consumers(email, password, full_name, phone) -- 2
values ('alp@email.com', '1234', 'Alp HAN', 5416789191);
insert into consumers(email, password, full_name, phone) -- 3
values ('wilson@email.com', '1234', 'Jaana WILSON', 2126600065);

insert into consumer_addresses(consumer_id, address_id)
values (1, 4);
insert into consumer_addresses(consumer_id, address_id)
values (2, 2);
insert into consumer_addresses(consumer_id, address_id)
values (3, 1);

insert into devices(consumer_id, brand, model, date_of_registration, is_active) -- 1
values (1, 'ABC', 'AXHYTQZRZ', date('2019-09-19'), true);
insert into devices(consumer_id, brand, model, date_of_registration, is_active) -- 2
values (1, 'DEF', 'CJHKQIOLR', date('2018-08-18'), true);
insert into devices(consumer_id, brand, model, date_of_registration, is_active) -- 3
values (1, 'QWE', 'QBNFKLAOP', date('2018-08-18'), true);
insert into devices(consumer_id, brand, model, date_of_registration, is_active) -- 4
values (1, 'JKL', 'RWTYZFNCA', date('2018-08-18'), true);
insert into devices(consumer_id, brand, model, date_of_registration, is_active) -- 5
values (1, 'XYZ', 'BKTRPXCZG', date('2006-06-06'), false);
insert into devices(consumer_id, brand, model, date_of_registration, is_active) -- 6
values (2, 'ABC', 'TQZRZAXHY', date('2018-08-18'), true);
insert into devices(consumer_id, brand, model, date_of_registration, is_active) -- 7
values (2, 'DEF', 'IOLRCJHKQ', date('2018-08-18'), true);
insert into devices(consumer_id, brand, model, date_of_registration, is_active) -- 8
values (2, 'QWE', 'KLAOPQBNF', date('2018-08-18'), true);
insert into devices(consumer_id, brand, model, date_of_registration, is_active) -- 9
values (3, 'JKL', 'ZFNCARWTY', date('2018-08-18'), true);
insert into devices(consumer_id, brand, model, date_of_registration, is_active) -- 10
values (3, 'XYZ', 'BXCZGKTRP', date('2018-08-18'), true);

insert into device_addresses(device_id, address_id)
values (1, 1);
insert into device_addresses(device_id, address_id)
values (2, 2);
insert into device_addresses(device_id, address_id)
values (3, 3);
insert into device_addresses(device_id, address_id)
values (4, 4);
insert into device_addresses(device_id, address_id)
values (5, 5);
insert into device_addresses(device_id, address_id)
values (6, 1);
insert into device_addresses(device_id, address_id)
values (7, 2);
insert into device_addresses(device_id, address_id)
values (8, 3);
insert into device_addresses(device_id, address_id)
values (9, 1);
insert into device_addresses(device_id, address_id)
values (10, 5);

-- for CUSTOMER 1
insert into daily_consumptions(device_id, power, created_at)
values (1, 300, date('2021-01-17'));
insert into daily_consumptions(device_id, power, created_at)
values (2, 100, date('2021-01-12'));
insert into daily_consumptions(device_id, power, created_at)
values (1, 300, date('2021-09-02'));
insert into daily_consumptions(device_id, power, created_at)
values (2, 100, date('2021-09-29'));
insert into daily_consumptions(device_id, power, created_at)
values (3, 200, date('2021-09-11'));
insert into daily_consumptions(device_id, power, created_at)
values (4, 500, date('2021-09-07'));
insert into daily_consumptions(device_id, power, created_at)
values (1, 170, date('2021-09-19'));
insert into daily_consumptions(device_id, power, created_at)
values (3, 200, date('2021-01-13'));
insert into daily_consumptions(device_id, power, created_at)
values (4, 375, date('2021-01-27'));
insert into daily_consumptions(device_id, power, created_at)
values (1, 750, date('2021-01-01'));
insert into daily_consumptions(device_id, power, created_at)
values (4, 375, date('2021-06-24'));
insert into daily_consumptions(device_id, power, created_at)
values (1, 750, date('2021-07-01'));
insert into daily_consumptions(device_id, power, created_at)
values (4, 375, date('2021-08-27'));
insert into daily_consumptions(device_id, power, created_at)
values (1, 750, date('2021-06-18'));

-- for CUSTOMER 2
insert into daily_consumptions(device_id, power, created_at)
values (8, 100, date('2021-09-29'));
insert into daily_consumptions(device_id, power, created_at)
values (7, 200, date('2021-09-11'));
insert into daily_consumptions(device_id, power, created_at)
values (6, 500, date('2021-09-07'));
insert into daily_consumptions(device_id, power, created_at)
values (8, 170, date('2021-09-19'));
insert into daily_consumptions(device_id, power, created_at)
values (8, 200, date('2021-01-13'));
insert into daily_consumptions(device_id, power, created_at)
values (7, 375, date('2021-02-27'));
insert into daily_consumptions(device_id, power, created_at)
values (6, 750, date('2021-01-01'));

select consumer_id, dc.id, dc.device_id, dc.power, dc.created_at
from daily_consumptions dc
         left outer join devices d on dc.device_id = d.id
         left outer join consumers c on d.consumer_id = c.id
where c.id = 1
  and d.is_active = true
order by dc.created_at desc
limit 3 offset 1;

-- TODO : create a view for each month using 'created_at' filters
create materialized view bills_jan_2021 as
select consumer_id,
       sum(dc.power) * 2.5              as bill, --# price for each consumed kw/h hardcoded as 2.5 --
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

create unique index on bills_jun_2021 (consumer_id, created_at, due_date);

REFRESH MATERIALIZED VIEW CONCURRENTLY bills_jun_2021;

-- select active monthly bills #NOTE: 'monthly_bills' is a read-only materialized view and consists only active bills --
-- ### the unpaid/dued bills will be considered as they were detected by another script by administration (gets removed every month)
select *
from monthly_bills
where consumer_id = 1
order by created_at desc
limit 1 offset 0;
-- TODO: make consumer_id variable in the API codebase --


-- ! TEMP ! --


select dc.id, dc.device_id, dc.power, dc.created_at, count(dc.id) over () as total_rows
from daily_consumptions dc
         left outer join devices d on dc.device_id = d.id
         left outer join consumers c on d.consumer_id = c.id
where c.id = 1
  and d.is_active = true
order by dc.created_at desc;


select dc.id, dc.device_id, dc.power, dc.created_at, count(dc.id) over () as total_rows
from daily_consumptions dc
         left outer join devices d on dc.device_id = d.id
         left outer join consumers c on d.consumer_id = c.id
where c.id = ${id}
  and d.is_active = true
  and dc.created_at < '2021-05-10'
order by dc.created_at desc
limit ${limit} offset ${offset};

-- TEMP --
select dc.id, dc.device_id, dc.power, dc.created_at, count(dc.id) over () as total_rows
from daily_consumptions dc
         left outer join devices d on dc.device_id = d.id
         left outer join consumers c on d.consumer_id = c.id
where c.id = 1
  and d.is_active = true
  and dc.created_at <= '2021-09-19'
  and dc.created_at >= '2021-09-07'
order by dc.created_at desc
limit 5 offset 1;

select dc.id, dc.device_id, dc.power, dc.created_at, count(dc.id) over () as total_rows
from daily_consumptions dc
         left outer join devices d on dc.device_id = d.id
         left outer join consumers c on d.consumer_id = c.id
where c.id = ${id}
  and d.is_active = true
  and dc.created_at < '2030-12-31'
  and dc.created_at > '2010-01-01'
order by dc.created_at desc
limit ${limit} offset ${offset};

select d.id,
       brand,
       model,
       date_of_registration,
       is_active,
       street,
       additional_info,
       city,
       country,
       postal_code
from devices d
         left outer join device_addresses da on d.id = da.device_id
         left outer join addresses a on da.address_id = a.id
where d.id = 1;

-- /login -- Bring consumer via his/her address
select c.id,
       email,
       password,
       full_name,
       phone,
       street,
       additional_info,
       postal_code,
       city,
       state,
       country
from consumers c,
     consumer_addresses ca,
     addresses a
where c.id = ca.consumer_id
  and a.id = ca.address_id
  and c.email = 'baturalp@email.com';
