CREATE TABlE task(
    id integer primary key auto_increment,
    title varchar(200) not null,
    description varchar (300),
    done BOOLEAN NOT NULL DEFAULT 0,
    createat TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
)