CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question TEXT,
    answer TEXT
);

INSERT INTO questions (question, answer)
VALUES ('What is the capital of France?', 'Paris');