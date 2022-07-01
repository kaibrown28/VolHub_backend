-- create the database
CREATE DATABASE volunteerhub;

-- projects table
CREATE TABLE projects(
    project_id SERIAL PRIMARY KEY,
    organization VARCHAR(50),
    projectLead VARCHAR(35),
    description VARCHAR(3000)
);

--projects seed data
INSERT INTO projects(organization ,projectLead, description)
VALUES('Hug a Snake', 'Septimus Jones', 'Help handling non-venmomous snakes for outreach event.');


-- user role table
CREATE TABLE userrole(
    user_id SERIAL PRIMARY KEY,
    role VARCHAR(50)
);

--user role seed data
INSERT INTO userrole(role)
VALUES ('Administrator', 'Volunteer', 'Project Lead');

--volunteers table
CREATE TABLE volunteers(
    volunteer_id SERIAL PRIMARY KEY,
    firstName VARCHAR(25),
    lastName VARCHAR(25),
    interests VARCHAR(2000),
    skills VARCHAR(2000)
);

--volunteers seed data
INSERT INTO volunteers(firstName ,lastName, interests, skills)
VALUES('Louis', 'Dreyfus', 'baking', 'organizing');

--project lead table
CREATE TABLE projectlead(
    projectlead_id SERIAL PRIMARY KEY,
    firstName VARCHAR(25),
    lastName VARCHAR(25),
    organization VARCHAR(50)
);
--project lead seed data
INSERT INTO projectlead(firstName ,lastName, organization)
VALUES('Max', 'Goofy', 'Entertainment Agency');

--administrator table
CREATE TABLE administrator(
    admin_id SERIAL PRIMARY KEY,
    firstName VARCHAR(25),
    lastName VARCHAR(25),
    organization VARCHAR(50)
);

--administrator seed data
INSERT INTO administrator(firstName ,lastName, organization)
VALUES('Yuna', 'Lesca', 'VolHub inc.');