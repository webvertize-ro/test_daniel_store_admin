import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Request from '../components/Request';
import styled from 'styled-components';

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
  return (
    <StyledAdmin>
      <Container className="container">
        <p>Here will be the admin page!</p>
      </Container>
    </StyledAdmin>
  );
}
