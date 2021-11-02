<template>
	<div class="card" v-for="task in tasks" :key="task.dbId">
		<h2 class="card-title">
			{{ task.title }}
			<AppStatus :type="task.status" />
		</h2>
		<p>
			{{ task.description }}
		</p>
		<p>
			<strong>
				<small>
					{{ task.deadline }}
				</small>
			</strong>
		</p>
		<button class="btn primary" @click="insideTask(+task.id)">Посмотреть</button>
	</div>
</template>

<script>
import {computed} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import AppStatus from '../components/AppStatus'

export default {
	setup() {
		const router = useRouter()
		const store = useStore()
		const tasks = computed(() => store.getters.tasks)

		function insideTask(id) {
			router.push('/task/' + id)
		}

		return {
			insideTask,
			tasks
		}
	},
	components: {AppStatus}
}
</script>