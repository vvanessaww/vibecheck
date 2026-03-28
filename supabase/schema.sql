-- Run this in your Supabase SQL Editor (https://gueahatbomepwouiqvon.supabase.co)

-- Players table: stores quiz results
create table players (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  persona_id text not null,
  day_picks jsonb not null default '{}',
  created_at timestamptz default now()
);

-- Challenges table: links two players
create table challenges (
  id uuid default gen_random_uuid() primary key,
  challenger_id uuid references players(id) not null,
  recipient_id uuid references players(id) not null,
  chemistry_score integer,
  created_at timestamptz default now()
);

-- Index for looking up challenges by player
create index idx_challenges_challenger on challenges(challenger_id);
create index idx_challenges_recipient on challenges(recipient_id);

-- Enable Row Level Security (required for anon key access)
alter table players enable row level security;
alter table challenges enable row level security;

-- Allow anyone to insert and read (public quiz, no auth)
create policy "Anyone can insert players" on players for insert with check (true);
create policy "Anyone can read players" on players for select using (true);
create policy "Anyone can insert challenges" on challenges for insert with check (true);
create policy "Anyone can read challenges" on challenges for select using (true);
