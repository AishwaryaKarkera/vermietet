import { render, screen } from '@testing-library/react';
import App from './App';
import { Header } from './components';

test('testing useQuery', async () => {
  jest.mock('react-query', () => ({
    useQuery: () => (
      { isLoading: false, error: {}, data: [] },
      {
        refetch: jest.fn(),
      }
    ),
  }));
});

test('testing api', async () => {
  var go = await fetch('https://randomuser.me/api/?results=4').then(
    (response) => {
      return response.json();
    }
  );
  expect(go).toBeDefined();
  expect(go.results).toBeDefined();
  expect(go.results.length).toBe(4);
});

test('sorting api data', async () => {
  var go = await fetch('https://randomuser.me/api/?results=4').then(
    (response) => {
      return response.json();
    }
  );

  var tempRes = go.results.map((user, i) => {
    return { ...user, completed: true };
  });

  go.results.sort((a, b) => {
    return a.completed ? -1 : 1;
  });

  expect(go).toBeDefined();
  expect(go.results).toBeDefined();
  expect(tempRes[0].completed).toBeTruthy();
});

test('testing button', async () => {
  render(
    <div className="btnDiv">
      <button
        id="load-more-button"
        className="btnLoad"
        onClick={() => {
          config.results = 10;
          refetch();
        }}
      >
        Load More
      </button>
    </div>
  );
  var ele = document.getElementById('load-more-button');
  expect(ele).toBeTruthy();
});
