use danceacademy;

/* 
select * from time_table ; 
select trainer.login as "trainer", dance_style.id as "id", time_table.id as "id2", dance_style.name as "dance", time_table.date_and_time as "date" from time_table, trainer, dance_style where time_table.trainer_id=trainer.id and time_table.dance_style=dance_style.id and date_and_time > 20200309000000 and date_and_time < 20200315235959;
select * from time_table_user;
select review.comment as 'comment', users.login as 'login' from review, users where review.login=users.login and review.dance_style_id = 1;
delete from participation where login=:login and time_table_id=:dance_id
select * from participation where login='qwerty';
select * from users;
select * from review;
select * from trainer;
select * from dance_style;
insert into time_table(trainer_id, dance_style, date_and_time) values(1,1,20200323010000);
select trainer.login as "trainer", dance_style.id as "id", time_table.id as "id2", dance_style.name as "dance", time_table.date_and_time as "date" from time_table, trainer, dance_style where time_table.trainer_id=trainer.id and time_table.dance_style=dance_style.id and date_and_time > 20200309000000 and date_and_time < 20200318235959;
update trainer set fname="C", lname="Ronaldo", login= "crisu7", description= "The best footballer in Serie A! Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", phone= "", fb= "", insta= "", yt= "", twitter="" where id=2;
select * from trainer;
select trainer.login as 'trainer', dance_style.id as 'id', time_table.id as 'eventId', dance_style.name as 'dance', time_table.date_and_time as 'date' from time_table, trainer, dance_style where time_table.trainer_id=trainer.id and time_table.dance_style=dance_style.id and time_table.trainer_id=1 and time_table.dance_style=1
*/


select * from trainer;