import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ImageAnalysis from '../../src/components/ImageAnalysis';
import useImageAnalysis from '../../hooks/useImageAnalysis';

jest.mock('../../hooks/useImageAnalysis');

const mockUseImageAnalysis = useImageAnalysis as jest.MockedFunction<typeof useImageAnalysis>;

describe('ImageAnalysis', () => {
    beforeEach(() => {
        mockUseImageAnalysis.mockReturnValue({
            takeImage: jest.fn(),
            pickImageFromGallery: jest.fn(),
            analyzeImage: jest.fn(),
            image: '',
            setImage: jest.fn(),
            analysis: null,
            loading: false,
            error: null,
        });
    });

    it('renders ImageAnalysis component', () => {
        render(<ImageAnalysis close={jest.fn()} />);

        // Check if the component renders without crashing
        expect(screen.getByText('Food Image Analysis')).toBeTruthy();

        // Check if the initial elements are present
        expect(screen.getByText('Take a picture of food or upload one from your gallery to get started!')).toBeTruthy();
        expect(screen.getByText('It would be very useful to add a description to help the AI recognize the food.')).toBeTruthy();
        expect(screen.getByPlaceholderText('E.g : Chicken, Rice, etc.')).toBeTruthy();
        expect(screen.getByText('Take Picture')).toBeTruthy();
        expect(screen.getByText('Pick from Gallery')).toBeTruthy();
    });
});