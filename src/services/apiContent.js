import supabase from './supabase';
import { supabaseUrl } from './supabase';

export async function getContent(websiteId) {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('website_id', websiteId)
    .order('display_order');

  if (error) throw new Error(error.message);
  return data;
}

export async function updateTextContent({ id, value }) {
  const { data, error } = await supabase
    .from('content')
    .update({ value })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateImageContent({ id, websiteId, key, file }) {
  // 1. upload the file to Supabase Storage
  const filePath = `${websiteId}/${key}`;
  const { error: uploadError } = await supabase.storage
    .from('website-assets')
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw new Error(uploadError.message);

  // 2. get the public URL
  const { data: urlData } = supabase.storage
    .from('website-assets')
    .getPublicUrl(filePath);

  // 3. update the content table with the new URL
  const { data, error } = await supabase
    .from('content')
    .update({ value: urlData.publicUrl })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
