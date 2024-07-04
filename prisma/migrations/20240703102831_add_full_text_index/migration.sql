-- This is an empty migration.
CREATE INDEX full_text_idx ON "Films" USING GIN (to_tsvector('english', name));