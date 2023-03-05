-- creating new table
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    url text NOT NULL,
    title text NOT NULL,
    author text,
    likes int DEFAULT 0
);

-- inserting data
insert into blogs (url, title, author) values ('https://www.freecodecamp.org/news/sql-tips-save-time-write-simpler-queries/', 'SQL Tips to Help You Save Time and Write Simpler Queries', 'Oluseye Jeremiah');
insert into blogs (url, title, author) values ('https://www.freecodecamp.org/news/sql-select-statement-how-to-select-data-from-a-database/', 'SQL SELECT Statement – How to Select Data from a Database', 'Annoh Karlgusta');

-- checking the inserted data exists in the table
select * from blogs;