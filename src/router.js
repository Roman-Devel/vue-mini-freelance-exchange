import {createRouter, createWebHistory} from 'vue-router'
import Tasks from './views/Tasks'
import New from './views/New'
import Task from './views/Task'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{path: '/', component: Tasks},
		{path: '/new', component: New},
		{path: '/task/:taskId', component: Task},
		{path: '/:notFound(.*)', redirect: '/'}
	],
	linkActiveClass: 'active',
	linkExactActiveClass: 'active'
})

export default router