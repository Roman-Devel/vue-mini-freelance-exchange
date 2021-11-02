<template>
	<div class="card" v-if="task">
		<h2>{{ task.title }}</h2>
		<p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
		<p><strong>Дэдлайн</strong>: {{ task.deadline }}</p>
		<p><strong>Описание</strong>: {{ task.description }}</p>
		<div>
			<button class="btn" @click="changeStatus('pending')">Взять в работу</button>
			<button class="btn primary" @click="changeStatus('done')">Завершить</button>
			<button class="btn danger" @click="changeStatus('cancelled')">Отменить</button>
		</div>
	</div>
	<h3 class="text-white center" v-else>
		Задачи с id = <strong>{{ taskId }}</strong> нет.
	</h3>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import axios from 'axios'
import AppStatus from '../components/AppStatus'

export default {
	setup() {
		const store = useStore()
		const route = useRoute()

		const tasks = computed(() => store.getters.tasks)
		const taskId = route.params.taskId

		const task = tasks.value.find(t => t.id === +taskId)

		const changeStatus = async status => {
			store.commit('changeStatus', {
				id: taskId,
				type: status
			})

			try {
				await axios.patch(process.env.VUE_APP_DB_URL + task.dbId + '.json', { status })
			} catch (e) {
				console.warn(e.message)
			}
		}

		return {
			task,
			taskId,
			changeStatus
		}
	},
  	components: {AppStatus}
}
</script>

<style scoped>

</style>