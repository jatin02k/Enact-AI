-- Create proofs bucket
insert into storage.buckets (id, name, public) 
values ('proofs', 'proofs', true)
on conflict (id) do nothing;

-- Set up storage policies for proofs
create policy "Anyone can view proofs"
    on storage.objects for select
    using ( bucket_id = 'proofs' );

create policy "Authenticated users can upload proofs"
    on storage.objects for insert
    with check (
        bucket_id = 'proofs' 
        and auth.role() = 'authenticated'
    );
