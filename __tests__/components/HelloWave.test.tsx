import { render } from '@testing-library/react-native';
import React from 'react';
import { HelloWave } from '../../components/HelloWave';

describe('HelloWave', () => {
  it('renders HelloWave component', () => {
    const { getByText } = render(<HelloWave />);
    const element = getByText(/wave/i);
    expect(element).toBeTruthy();
  });
});