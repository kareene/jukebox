import userService from '@/services/user.service.js';

export default {
    state: {
        loggedinUser: userService.getLoggedinUser(),
        users: []
    },
    getters: {
        loggedinUser(state) {
            return state.loggedinUser;
        },
        users(state) {
            return state.toys;
        },
    },
    mutations: {
        setUser(state, { user }) {
            state.loggedinUser = user;
        },
        setUsers(state, { users }) {
            state.users = users;
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId);
        }
    },
    actions: {
        async login(context, { userCred }) {
            const user = await userService.login(userCred);
            if (!user) return;
            context.commit({ type: 'setUser', user });
            return user;
        },
        async signup(context, { userCred }) {
            const user = await userService.signup(userCred);
            if (!user) return;
            context.commit({ type: 'setUser', user });
            return user;
        },
        async logout(context) {
            await userService.logout()
            context.commit({ type: 'setUsers', users: [] });
            context.commit({ type: 'setUser', user: userService.getLoggedinUser() }); // returns guest after logout
        },
        async updateUser(context, { user }) {
            user = await userService.update(user);
            context.commit({ type: 'setUser', user });
            return user;
        },
        async loadUsers(context) {
            const users = await userService.getUsers();
            context.commit({ type: 'setUsers', users });
            return users;
        },
        async removeUser(context, { userId }) {
            await userService.remove(userId);
            context.commit({ type: 'removeUser', userId });
        }
    }
}