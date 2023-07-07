CREATE TABLE location_db (
	location_db_id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description TEXT
);

CREATE TABLE weather (
    weather_id SERIAL PRIMARY KEY,
	description TEXT,
	type VARCHAR(255)
);

CREATE TABLE weather_location_db (
	weather_id INTEGER NOT NULL REFERENCES weather(weather_id),
	location_db_id INTEGER NOT NULL REFERENCES location_db(location_db_id),
	speed FlOAT,
	force FLOAT,
	destructiveness INTEGER,
	start_time TIME,
	end_time TIME,
	PRIMARY KEY (weather_id, location_db_id)
);

CREATE TABLE quality (
	quality_id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	critical BOOLEAN
);

CREATE TABLE equipment (
    equipment_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INTEGER CHECK (quantity >= 0),
	working BOOLEAN,
	connection_quality INTEGER NOT NULL REFERENCES quality(quality_id)
);

CREATE TABLE thoughts (
	thought_id SERIAL PRIMARY KEY,
	content TEXT,
	positive BOOLEAN
);

CREATE TABLE people (
  person_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  thoughts INTEGER NOT NULL REFERENCES thoughts(thought_id),
  location_db INTEGER NOT NULL REFERENCES location_db(location_db_id)
);


CREATE TABLE weather_people (
	weather_id INTEGER NOT NULL REFERENCES weather(weather_id),
	person_id INTEGER NOT NULL REFERENCES people(person_id),
	emotions TEXT,
	PRIMARY KEY (weather_id, person_id)
);

CREATE TABLE equipment_owner (
	person_id INTEGER NOT NULL REFERENCES people(person_id),
	equipment_id INTEGER NOT NULL REFERENCES equipment(equipment_id),
	PRIMARY KEY (person_id, equipment_id)
);

INSERT INTO location_db VALUES(default, 'Лагерь', 'Лагерь, в котром находятся герои');
INSERT INTO location_db VALUES(default, 'База', 'Ну это база');
INSERT INTO weather VALUES (default, 'wind', 'Разрушительный шквалистый ветер безумной силы');
INSERT INTO thoughts VALUES (default, 'Все передатчики не могли разом выйти из строя', 'TRUE');
INSERT INTO thoughts VALUES (default, 'Ну и где они?..', 'FALSE');
INSERT INTO quality VALUES (default, 'Потрескивания и шум', 'TRUE');
INSERT INTO quality VALUES (default, 'Чисто', 'FALSE');
INSERT INTO equipment VALUES (default, 'Передатчик', 1, 'TRUE', 1);
INSERT INTO equipment VALUES (default, 'Радиофицированный самолет', 4, 'TRUE', 2);
INSERT INTO people VALUES (default, 'Мы', 1, 1);
INSERT INTO people VALUES (default, 'Лейк', 2, 2);

INSERT INTO equipment_owner VALUES (1, 1);
INSERT INTO equipment_owner VALUES (2, 2);

INSERT INTO weather_location_db VALUES(1, 1, 2.55, 3.11, 3, '12:00:00', '14:00:00');

INSERT INTO weather_people VALUES(1, 1, 'Испуг');
INSERT INTO weather_people VALUES(1, 2, 'Стресс');
