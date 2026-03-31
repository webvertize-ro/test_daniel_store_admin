import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Request from '../components/Request';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const StyledAdmin = styled.div`
  height: 100vh;
  background-color: rgba(54, 85, 104, 1);
  color: #fff;
`;

const Container = styled.div`
  padding: 1.25rem 0;
  display: flex;
  flex-direction: column;
`;

const StyledH2 = styled.h2`
  margin-bottom: 1.5rem;
`;

export default function Admin() {
  const { user, websiteId, isAuthenticated, loading } = useAuth();

  return (
    <StyledAdmin>
      <Container className="container">
        <p>Bun venit, {user.email}!</p>
      </Container>
    </StyledAdmin>
  );
}
