// 1. function that retrieves submissions
import { WEBSITE_ID } from '../../config';
import supabase from './supabase';

export async function getSubmissions() {
  const { data: submissions, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('website_id', WEBSITE_ID)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return submissions;
}

// 2. function that deletes submissions based on submission id
export async function deleteSubmission(id) {
  const { error } = await supabase.from('submissions').delete().eq('id', id);

  if (error) throw new Error(error.message);
}

// 3. function that subscribes to live-changes to submissions
export function subscribeToMessages(callback) {
  return supabase
    .channel('submissions-channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'submissions',
      },
      callback,
    )
    .subscribe();
}
