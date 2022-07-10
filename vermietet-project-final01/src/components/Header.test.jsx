
import { render, screen } from '@testing-library/react';
import { Header } from './Header';


test('rendering and checking Header component', async () => {
  render(<Header todos={[]} data={[]} sortValue={''} onToggleAll={(areAllTodosCompleted) => {}}/>);
  var dd = await screen.findByTestId('header');
  expect(dd).toBeTruthy();
// screen.getByTestId("header");    
});