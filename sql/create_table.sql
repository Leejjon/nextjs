SELECT table_schema,table_name
FROM information_schema.tables
ORDER BY table_schema,table_name;

CREATE TABLE queueEntries (
  entryId SERIAL PRIMARY KEY,
  ready BOOLEAN NOT NULL
);

INSERT INTO queueEntries(ready) VALUES(false);

SELECT count(*) FROM queueEntries WHERE entryId != 2 AND entryId < 2;
