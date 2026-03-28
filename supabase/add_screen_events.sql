-- Run this in Supabase SQL Editor

create table screen_events (
  id uuid default gen_random_uuid() primary key,
  session_id text not null,
  screen text not null,
  created_at timestamptz default now()
);

create index idx_screen_events_session on screen_events(session_id);
create index idx_screen_events_screen on screen_events(screen);

alter table screen_events enable row level security;

create policy "Anyone can insert screen_events" on screen_events for insert with check (true);
create policy "Anyone can read screen_events" on screen_events for select using (true);
