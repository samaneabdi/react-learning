import Cat from './Cats';
import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { QueryClientProvider } from "react-query";
import queryClient from "../../api/query-client";
import { expect, test } from "vitest";

test('Cat Renders', async ()=> {
render(<Provider store={store}>
        <QueryClientProvider client={queryClient}>
        <Cat/>
        </QueryClientProvider></Provider>);
const linkElement = screen.getByText(/salam/i);
expect(linkElement).toBeInTheDocument();
})