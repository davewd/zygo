import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react-native';
import { HelloWave } from '../../packages/ui/src/HelloWave';
describe('HelloWave', () => {
    it('renders HelloWave component', () => {
        const { getByText } = render(_jsx(HelloWave, {}));
        const element = getByText(/wave/i);
        expect(element).toBeTruthy();
    });
});
