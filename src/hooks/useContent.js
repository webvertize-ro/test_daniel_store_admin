import { useQuery } from '@tanstack/react-query';
import { getContent } from '../services/apiContent';
import useAuth from '../context/AuthContext ';

export function useContent() {
  const { websiteId } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['content', websiteId],
    queryFn: () => getContent(websiteId),
    enabled: !!websiteId,
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
