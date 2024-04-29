CREATE TABLE surveys (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    survey_id INT REFERENCES surveys(id),
    question_type VARCHAR(20) NOT NULL,
    question_text TEXT NOT NULL
);

CREATE TABLE options (
    id SERIAL PRIMARY KEY,
    question_id INT REFERENCES questions(id),
    option_text TEXT NOT NULL
);

CREATE TABLE responses (
    id SERIAL PRIMARY KEY,
    question_id INT REFERENCES questions(id),
    response_text TEXT
);
