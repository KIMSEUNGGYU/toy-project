import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  test('renders components correctly', () => {
    const { container } = render(<App />); // container 는 리액트 컴포넌트에서 화면에 표시되는 부분을 담고 있는 오브젝트

    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();

    expect(container.getElementsByClassName('App-logo')).toHaveLength(1);
    expect(container.getElementsByClassName('App-logo')[0]).toHaveAttribute('src', 'logo.svg');

    expect(container.getElementsByTagName('p')).toHaveLength(1);
    expect(container.getElementsByTagName('p')[0]).toHaveTextContent(
      'Edit src/App.js and save to reload.',
    );

    expect(container).toMatchSnapshot();
  });
});
