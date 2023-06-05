INSERT INTO exercise_type (name) VALUES ('Reps');
INSERT INTO exercise_type (name) VALUES ('Reps/Weight');
INSERT INTO exercise_type (name) VALUES ('Distance/Time');
INSERT INTO exercise_type (name) VALUES ('Time');

INSERT INTO exercise_field (type, sort_order) VALUES ('REPS', 1);
INSERT INTO exercise_field (type, sort_order) VALUES ('WEIGHT', 0);
INSERT INTO exercise_field (type, sort_order) VALUES ('TIME', 2);
INSERT INTO exercise_field (type, sort_order) VALUES ('DISTANCE', 3);

INSERT INTO exercise_type_exercise_field (exercise_type_id, exercise_field_id) VALUES (1, 1);
INSERT INTO exercise_type_exercise_field (exercise_type_id, exercise_field_id) VALUES (2, 1);
INSERT INTO exercise_type_exercise_field (exercise_type_id, exercise_field_id) VALUES (2, 2);
INSERT INTO exercise_type_exercise_field (exercise_type_id, exercise_field_id) VALUES (3, 3);
INSERT INTO exercise_type_exercise_field (exercise_type_id, exercise_field_id) VALUES (3, 4);
INSERT INTO exercise_type_exercise_field (exercise_type_id, exercise_field_id) VALUES (4, 4);

INSERT INTO exercise (name, exercise_type_id, user_id) VALUES ('Bench press', 2, 1);
INSERT INTO exercise (name, exercise_type_id, user_id) VALUES ('Deadlift', 2, 1);
INSERT INTO exercise (name, exercise_type_id, user_id) VALUES ('Squat', 2, 1);
INSERT INTO exercise (name, exercise_type_id, user_id) VALUES ('Pull up', 1, 1);
INSERT INTO exercise (name, exercise_type_id, user_id) VALUES ('Push up', 1, 1);
INSERT INTO exercise (name, exercise_type_id, user_id) VALUES ('Weighted pull up', 2, 1);
INSERT INTO exercise (name, exercise_type_id, user_id) VALUES ('Chin up', 1, 1);
INSERT INTO exercise (name, exercise_type_id, user_id) VALUES ('Weighted chin up', 2, 1);
INSERT INTO exercise (name, exercise_type_id, user_id) VALUES ('Cable row', 2, 1);

INSERT INTO workout (name, type, user_id) VALUES ('Workout 1', 'TEMPLATE', 1);
INSERT INTO workout (name, type, user_id) VALUES ('Workout 2', 'TEMPLATE', 1);
INSERT INTO workout (name, type, user_id) VALUES ('Workout 3', 'TEMPLATE', 1);

