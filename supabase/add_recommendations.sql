-- Run this in Supabase SQL Editor
alter table players add column recommendations jsonb not null default '[]';
