import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { getContent } from '../services/apiContent';

export function useContent() {
  const { websiteId } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['content', websiteId],
    queryFn: () => getContent(websiteId),
    enabled: websiteId ? true : false,
  });

  // group by page then by section
  const grouped =
    data?.reduce((acc, row) => {
      if (!acc[row.page]) acc[row.page] = {};
      if (!acc[row.page][row.section]) acc[row.page][row.section] = [];
      acc[row.page][row.section].push(row);
      return acc;
    }, {}) ?? {};

  return { grouped, isLoading, error };
}
