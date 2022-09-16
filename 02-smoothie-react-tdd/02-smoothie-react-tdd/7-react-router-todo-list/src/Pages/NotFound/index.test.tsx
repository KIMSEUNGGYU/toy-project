import { Router, useLocation } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { NotFound } from './index';

describe('<NotFound />', () => {
  it('renders component correctly', () => {
    const { container } = render(<NotFound />);

    const message = screen.getByText('Not Found!!!');
    expect(message).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
