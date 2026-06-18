--CREATE DATABASE CoursePath
--use CoursePath

CREATE TABLE mentor (
id int PRIMARY KEY IDENTITY(1,1),
name VARCHAR(20),
email varchar(40) UNIQUE,
password varchar(30),
gender varchar(30),
role varchar(10),
department varchar(15)
)

CREATE TABLE student
(
rollnum varchar(20) PRIMARY KEY,
name VARCHAR(50),
email varchar(40) UNIQUE,
password varchar(50),
gender varchar(30),
role varchar(10),
department varchar(20)
)

CREATE TABLE Courses
(
title nvarchar(20),
duration_in_months int,
description varchar(max),
createdby nvarchar(20),
isDeleted int DEFAULT 0,
role varchar(10),
department varchar(15)
)

CREATE TABLE CoursesEnrolled
(
id int PRIMARY KEY IDENTITY(1,1),
studentRollnum VARCHAR(20),
studentName VARCHAR(50),
studentEmail VARCHAR(100),
studentDepartment VARCHAR(20),
courseId VARCHAR(20),
courseTitle VARCHAR(100),
courseDuration INT,
courseDescription VARCHAR(MAX),
providedBy VARCHAR(100),
startDate DATE,
status VARCHAR(30)
)

INSERT INTO mentor(name,email,password,gender,role,department) VALUES ('Mentor','mentor1@gmail.com','Mentor@123','Male','Mentor','Finance'),
('Chinese','chinese1@gmail.com','Chinese@123','Female','Mentor','IT');

INSERT INTO student(rollnum,name,email,password,gender,role,department) VALUES ('23BCS031','Midhun','midhun1@gmail.com','Midhun@123','Male','Student','IT'),
('23BCS040','Sweatha','sweatha@gmail.com','Sweatha@123','Female','Student','Finance');

INSERT INTO Courses(title,duration_in_months,description,createdby,isDeleted,role,department) VALUES ('Bootstrap CSS', 1, 'CSS Framework', 'mentor1@gmail.com', 0, 'Mentor', 'IT'),
('JIRA', 2, 'Project Management Tool', 'mentor1@gmail.com', 0, 'Mentor', 'IT');


INSERT INTO Courses(title,duration_in_months,description,createdby,isDeleted,role,department) VALUES ('CSS', 1, 'CSS Framework', 'chinese1@gmail.com', 1, 'Chinese', 'IT');

CREATE VIEW notDeletedCourses AS
SELECT * FROM Courses
WHERE isDeleted = 1

SELECT * FROM notDeletedCourses

CREATE PROCEDURE departmentFilter 
@dept_name varchar(30)
AS
BEGIN
SELECT * FROM Courses
WHERE department = @dept_name;
END;

Declare @dept_name_ varchar(30);
Set @dept_name_ = 'IT';
exec departmentFilter @dept_name_

INSERT INTO CoursesEnrolled
(
    studentRollnum,
    studentName,
    studentEmail,
    studentDepartment,
    courseId,
    courseTitle,
    courseDuration,
    courseDescription,
    providedBy,
    startDate,
    status
)
VALUES
(
    '23BCS031',
    'Midhun',
    'midhun1@gmail.com',
    'IT',
    'LGAYH1N-oKs',
    'JIRA',
    2,
    'Jira is a Software',
    'mentor1@gmail.com',
    '2026-06-17',
    'Completed'
),
(
    '24BCS040',
    'Sweatha',
    'sweatha@gmail.com',
    'Finance',
    'zM7-isDipNs',
    'BOOTSTRAP CSS',
    1,
    'CSS Framework for responsive web development',
    'mentor1@gmail.com',
    '2026-06-18',
    'Not Yet Started'
);

CREATE PROCEDURE studentEnrolledCourses
@roll_num VARCHAR(50)
AS 
BEGIN
SELECT studentRollnum,studentName,studentDepartment,courseTitle,courseDuration,courseDescription,providedBy,startDate,status from CoursesEnrolled
where studentRollnum = @roll_num
END;

DECLARE @stu_rollnum VARCHAR(50);
Set @stu_rollnum = '23BCS031';
EXEC studentEnrolledCourses @stu_rollnum

SELECT * from mentor m
join Courses c
on m.email = c.createdby

Alter PROCEDURE coursesCreatedBYMentor
@ment_email VARCHAR(50)
AS 
BEGIN
SELECT m.name,m.email,m.department , c.title,c.duration_in_months,c.description from mentor m
join Courses c
on m.email = c.createdby
where c.isDeleted = 0 and m.email = @ment_email;
END;

DECLARE @mentor_email varchar(50);
set @mentor_email = 'mentor1@gmail.com'
EXEC coursesCreatedBYMentor @mentor_email


CREATE INDEX idx_course_createdby
ON Courses(createdby);

CREATE INDEX idx_enrolled_studentemail
ON CoursesEnrolled(studentEmail);

select * from mentor;
Select * from Courses;
Select * from student;
Select * from CoursesEnrolled;