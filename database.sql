CREATE DATABASE volunteerhub;

CREATE TABLE projects(
    project_id SERIAL PRIMARY KEY,
    organization VARCHAR(50),
    projectLead VARCHAR(35),
    description VARCHAR(3000)
);