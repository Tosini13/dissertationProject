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
select * from dance_style;
*/



select * from dance_style;