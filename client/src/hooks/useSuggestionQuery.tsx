import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AppContext } from '~/contexts/AppContext';
import userApi from '~/services/user';

export default function useSuggestionQuery() {
  const { currentUser } = useContext(AppContext);
  const id = currentUser?._id as string;
  return useQuery({
    queryKey: ['suggestion', id],
    queryFn: () => userApi.getSuggestionsUser(id),
    enabled: !!id,
  });
}
