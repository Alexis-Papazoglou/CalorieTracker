import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import Home from '../../src/screens/Home/index';

describe('<Home />', () => {
  it('fetches data and updates the state', async () => {
    // Mock the fetch function
    const mockFetch = jest.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ message: 'Server is running' }))
      )
    );
    global.fetch = mockFetch as jest.Mock;

    const { getByText } = render(<Home />);

    // Wait for the fetch to complete and the state to update
    await waitFor(() => getByText('Server is running'));

    // Check that the state was updated correctly
    expect(getByText('Server is running')).toBeTruthy();

    // Clear the mock to ensure it doesn't affect other tests
    mockFetch.mockClear();
  });
});