import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserCard from './UserCard';

describe('UserCard', () => {
    const mockUser = {
        id: 1,
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
        address: { city: 'Gwenborough' },
    };

    it('muestra los datos del usuario y emite el evento al hacer clic en Favorito', async () => {
        const user = userEvent.setup();
        const handleToggle = vi.fn();

        render(
            <UserCard
                user={mockUser}
                isFavorite={false}
                onToggleFavorite={handleToggle}
            />
        );

        expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
        expect(screen.getByText(/Sincere@april\.biz/)).toBeInTheDocument();
        expect(screen.getByText(/Gwenborough/)).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: /favorito/i }));
        expect(handleToggle).toHaveBeenCalledTimes(1);
        expect(handleToggle).toHaveBeenCalledWith(1);
    });
});