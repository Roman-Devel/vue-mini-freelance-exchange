import {createRouter, createWebHistory} from 'vue-router'
import New from './views/New'
import Task from './views/Task'
const Tasks = () => import('./views/Tasks')

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