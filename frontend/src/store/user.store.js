import userService from '@/services/user.service.js';

export default {
    state: {
        users: []
    },
    getters: {
        users(state) {
            return state.toys;
        }
    },
    mutations: {
        setUsers(state, { users }) {
            state.users = users;
        }
    },
    actions: {
        async loadUsers(context) {
            const users = await userService.query(context.getters.filterBy);
            context.commit({ type: 'setUsers', users });
            return users;
        }
    }
}