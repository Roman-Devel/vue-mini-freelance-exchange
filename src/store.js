import {createStore, createLogger} from 'vuex'

export default createStore({
	plugins: [createLogger()],
	state() {
		return {
			title: 'Freelance',
			tasks: []
		}
	},
	mutations: {
		addTasks(state, payload) {
			state.tasks = []
			state.tasks.push(...payload)
		},
		changeStatus(state, {id, type}) {
			state.tasks.map(task => {
				if (task.id === +id) {
					task.status = type
				}
			})
		}
	},
	getters: {
		tasks(state) {
			return state.tasks
		},
		total(state) {
			return state.tasks.filter(task => task.status === 'active').length
		}
	}
})