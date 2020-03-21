drop database if exists danceacademy;
create database danceacademy;
use danceacademy;

/* ---------------- */
/* 		CREATE		*/
/* ---------------- */

create table users(
login varchar(30)  not null,
email varchar(50)  not null,
password varchar(255)  not null,
rights varchar(3) CHECK (rights="rwx" or rights="rw" or rights="rx" or rights="wx" or rights="r" or rights="w" or rights="x" or rights=null),
primary key(login));
/* user with null rights is inactive */

create table personal_data(
id int auto_increment,
login varchar(30) not null,
position varchar(30) not null CHECK(position="trainer" or position="customer"),
fname varchar(30) not null,
lname varchar(30) not null,
street varchar(30),
house_no varchar(10),
apartment_no varchar(10),
post_code int(5),
city varchar(10),
country varchar(10),
tel_num int(15),
dob date,
primary key(id));

create table room(
name varchar(30) not null,
capacity int,
primary key(name));

create table trainer(
id int auto_increment not null,
login varchar(20) not null,
photo varchar(30),
description text not null,
primary key(id),
foreign key(login) references personal_data(login));

create table dance_style(
id int not null auto_increment,
name varchar(20) not null,
type varchar(20) CHECK(type="opened" or type="closed" or type="workshop" or type="party"),
description text,
primary key(id));

create table events_type(
id int not null auto_increment,
type varchar(20) CHECK(type="opened" or type="closed" or type="workshop" or type="party"),
color varchar(7),
primary key(id));

create table time_table(
id int not null auto_increment,
trainer_id int,
dance_style varchar(20),
date_and_time datetime,
room_name varchar(30),
primary key(id));

create table news(
id int not null auto_increment,
title varchar(30) not null,
description text,
photo varchar(30),
primary key(id));

create table events(
id int not null auto_increment,
style_id int not null,
doe date,
primary key(id),
foreign key(style_id) references dance_style(id));

create table price_discount(
type varchar(20) not null,
description text,
discount double,
primary key(type));

create table price_list(
id int not null auto_increment,
style_id int,
price double,
primary key(id),
foreign key(style_id) references dance_style(style_id));

/* ---------------- */
/* 		INSERT		*/
/* ---------------- */

/*13administrator*/
insert into users(email,login,password, rights) values("admin13@gmail.com","admin13","$2y$10$Xz8Mc7aDsOpabN..b.dR2O8RWNL6zjvR88Y8FKKR7k8jy9CL1jqcC","rwx");

insert into users values("leo","leo@gmail.com","default","rw");
insert into users values("cris","cris@gmail.com","default","rw");
insert into users values("ney","ney@gmail.com","default","rw");
insert into users(login, email, password) values("griez","griez@gmail.com","default");

insert into personal_data(login, position, fname,lname) values("leo","trainer","Lionel","Messi");
insert into personal_data(login, position, fname,lname) values("ney","trainer","Neymar","da Silva Santos Junior");
insert into personal_data(login, position, fname,lname) values("cris","trainer","Cristiano","Ronaldo");
insert into personal_data(login, position, fname,lname) values("griez","trainer","Antoine","Griezman");

insert into news(title,description,photo) values("Hip-hop camp!","We will organise hip-hop camp from 20.07.2019 to 25.07.2019","hip-hop_camp.jpg");
insert into news(title,description) values("Lorem!","ipsum");
insert into news(title,description,photo) values("Ballet camp!","From 20.07.2019 to 25.07.2019 you can take part in ballet camp!","dance_camp.jpg");

insert into trainer(login, photo, description) values("leo","trainer.jpg","The best footballer in the world! Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.");
insert into trainer(login, photo, description) values("cris","trainer.jpg","The best footballer in Serie A! Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.");
insert into trainer(login, photo, description) values("ney","trainer.jpg","The best footballer in Ligue1!Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.");
insert into trainer(login, photo, description) values("griez","trainer.jpg","One of the best footballer in the world! Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.");

insert into dance_style(name, type, description) values("Dancehall","opened","Dancehall is a genre of Jamaican popular music that originated in the late 1970s. Initially, dancehall was a more sparse version of reggae than the roots style, which had dominated much of the 1970s.");
insert into dance_style(name, type, description) values("Hip-hop","opened","Hip hop or hip-hop, is a culture and art movement that was created by African Americans, Latino Americans and Caribbean Americans in the Bronx, New York City. The origin of the name is often disputed. It is also argued as to whether hip hop started in the South or West Bronx.");
insert into dance_style(name, type, description) values("Waacking","opened","Waack/Punk is a form of dance created in the LGBT clubs of Los Angeles, during the 1970s disco era. This dance style was named punking because 'punk' was a derogatory term for gay men in the 70s. Naming the style punking was a way of turning this negative term into something positive.");
insert into dance_style(name, type, description) values("Open Choreo","workshop","Lorem ipsum Open Choreo");
insert into dance_style(name, type, description) values("Party","party","Lorem ipsum Party");
insert into dance_style(name, type, description) values("bachata","opened" , "Bachata is a style of social dance from the Dominican Republic which is now danced all over the world. It is connected with bachata music."); 
insert into dance_style(name, type, description) values("raggaeton","opened" , "Reggaeton is a music style which originated in Puerto Rico during the late 1990s. It is influenced by American hip hop, Latin American, and Caribbean music. Vocals include rapping and singing, typically in Spanish."); 
insert into dance_style(name, type, description) values("latino","opened" , "Latin dance is a general label, and a term in partner dance competition jargon. It refers to types of ballroom dance and folk dance that originated in Latin America."); 
insert into dance_style(name, type, description) values("kizomba","opened" , "Kizomba is a genre of dance and a Portuguese language musical genre originating in Angola in 1984. Kizomba means 'party' in Kimbundu, a minority Bantu language spoken in Angola.");


insert into events_type(type, color) values("opened","#055975");
insert into events_type(type, color) values("closed","#700606");
insert into events_type(type, color) values("workshop","#215924");
insert into events_type(type, color) values("party","#5e234d");

insert into events(style_id, doe) values(1,"20191202");
insert into events(style_id, doe) values(2,"20200806");
insert into events(style_id, doe) values(3,"20191212");
insert into events(style_id, doe) values(4,"20200822");
insert into events(style_id, doe) values(5,"20191230");
insert into events(style_id, doe) values(6,"20200831");
insert into events(style_id, doe) values(7,"20201215");
insert into events(style_id, doe) values(8,"20200720");
insert into events(style_id, doe) values(9,"20191225");
insert into events(style_id, doe) values(10,"20200721");

insert into events(style_id, doe) values(1,"20191220");
insert into events(style_id, doe) values(2,"20200831");
insert into events(style_id, doe) values(3,"20191215");
insert into events(style_id, doe) values(4,"20200721");
insert into events(style_id, doe) values(5,"20191231");
insert into events(style_id, doe) values(6,"20200831");
insert into events(style_id, doe) values(7,"20191221");
insert into events(style_id, doe) values(8,"20200720");
insert into events(style_id, doe) values(9,"20191212");
insert into events(style_id, doe) values(10,"20200830");


insert into price_discount values("adult", "Person over 18 years old",1);
insert into price_discount values("kids","Person under 12 years old",0.5);
insert into price_discount values("youth", "Person over 12 years old and under 18 years old",0.8);

insert into price_list(style_id,price) values(1,50);
insert into price_list(style_id,price) values(2,45);
insert into price_list(style_id,price) values(3,48);
insert into price_list(style_id,price) values(4,60);
insert into price_list(style_id,price) values(5,55);
insert into price_list(style_id,price) values(6,58);
insert into price_list(style_id,price) values(7,54);
insert into price_list(style_id,price) values(8,62);
insert into price_list(style_id,price) values(9,32);
insert into price_list(style_id,price) values(10,80);