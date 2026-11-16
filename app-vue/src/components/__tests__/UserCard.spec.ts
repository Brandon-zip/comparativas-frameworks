import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import UserCard from '../UserCard.vue';

describe('UserCard', () => {
    const mockUser = {
        id: 1,
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
        address: { city: 'Gwenborough' },
    };

    it('muestra los datos del usuario y emite el evento toggleFavorite al hacer clic', async () => {
        const wrapper = mount(UserCard, {
            props: {
                user: mockUser,
                isFavorite: false,
            },
        });

        expect(wrapper.text()).toContain('Leanne Graham');
        expect(wrapper.text()).toContain('Sincere@april.biz');
        expect(wrapper.text()).toContain('Gwenborough');

        await wrapper.find('button.fav-btn').trigger('click');

        expect(wrapper.emitted('toggleFavorite')).toBeTruthy();
        expect(wrapper.emitted('toggleFavorite')?.[0]).toEqual([1]);
    });
});