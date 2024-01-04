create table matches (
    id int,
    title text
);

create table leaderboard (
    match_id int,
    user_id int,
    user_name text,
    position int,
    score float
);

insert into matches(id, title, version) values (1, 'Sample match');

insert into leaderboard(user_id, user_name, position, score, match_id)
(
select user_id,
       user_name,
       row_number() over(order by score desc),
       score,
       1
  from (select trunc(random() * 10000) as score,
               'user_' || trunc(random() * 1000000) as user_name,
               trunc(random() * 10000000) as user_id
          from generate_series(1, 1000)
       ) t
);