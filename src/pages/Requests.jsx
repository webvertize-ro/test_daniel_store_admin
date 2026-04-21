import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Request from '../components/Request';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteSubmission,
  getSubmissions,
  subscribeToMessages,
} from '../services/apiSubmissions';
import supabase from '../services/supabase';

const StyledRequests = styled.div`
  background-color: rgba(54, 85, 104, 1);
  color: #fff;
  padding-top: 4.5rem;
`;

const Container = styled.div`
  padding: 1.25rem 0;
  display: flex;
  flex-direction: column;
`;

const StyledH2 = styled.h2`
  margin-bottom: 1.5rem;
`;

export default function Requests() {
  const queryClient = useQueryClient();

  // Retrieve the submissions initially with React Query
  const {
    data: submissions = [],
    isPending,
    error: errorGetSubmissions,
  } = useQuery({
    queryKey: ['submissions'],
    queryFn: () => getSubmissions(),
  });

  // Delete function
  const { mutate: deleteSub, isPending: isLoadingDelete } = useMutation({
    mutationFn: deleteSubmission,
    onError: (error) => console.error(error),
  });

  // Live-subscription for submissions
  useEffect(() => {
    const channel = subscribeToMessages((payload) => {
      if (payload.eventType === 'INSERT') {
        queryClient.setQueryData(['submissions'], (old = []) => {
          return [...old, payload.new];
        });
      }

      if (payload.eventType === 'DELETE') {
        queryClient.setQueryData(['submissions'], (old) =>
          old.filter((s) => s.id !== payload.old.id),
        );
      }
    });

    // Cleanup on unmount
    return () => supabase.removeChannel(channel);
  }, [queryClient, deleteSub]);

  // Show spinner while loading
  if (isPending) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <StyledRequests>
      <Container className="container">
        <StyledH2>Solicitări primite</StyledH2>

        <div className="container">
          {submissions.map((e) => (
            <Request
              name={e.name}
              email={e.email}
              message={e.message}
              date={e.created_at}
              id={e.id}
              onDelete={deleteSub}
            />
          ))}
        </div>
      </Container>
    </StyledRequests>
  );
}
