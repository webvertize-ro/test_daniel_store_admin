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
  // const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const entries = [
    {
      name: 'Ion Popescu',
      email: 'ion@test.com',
      message: 'Buna ziua!',
      createdAt: '2026-02-26T08:27:38.886+00:00',
    },
    {
      name: 'Vasile Ionescu',
      email: 'vasile@test.com',
      message: 'Buna seara!',
      createdAt: '2026-02-26T08:27:54.590+00:00',
    },
  ];

  // Fetching entries from the database with polling
  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   if (!token) {
  //     window.location.href = '/';
  //     return;
  //   }

  //   async function getData() {
  //     try {
  //       const res = await fetch('/api/submissions', {
  //         headers: {
  //           Authorization: 'Bearer ' + token,
  //         },
  //       });

  //       if (!res.ok) {
  //         setError('Error loading data');
  //         return;
  //       }

  //       const data = await res.json();
  //       setEntries(data);
  //     } catch (error) {
  //       setError('Error loading data');
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   getData();

  //   const interval = setInterval(getData, 1500);

  //   return () => clearInterval(interval);
  // }, []);

  // Show spinner while loading
  // if (loading) {
  //   return (
  //     <div
  //       className="d-flex justify-content-center align-items-center"
  //       style={{ height: '100vh' }}
  //     >
  //       <div className="spinner-border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <StyledAdmin>
      <Container className="container">
        <StyledH2>Solicitări trimise</StyledH2>
        {error && <p>{error}</p>}
        <div className="container">
          {console.log('database entries: ', entries)}
          {entries.map((e) => (
            <Request
              name={e.name}
              email={e.email}
              message={e.message}
              date={e.createdAt}
              id={e._id}
            />
          ))}
        </div>
      </Container>
    </StyledAdmin>
  );
}
