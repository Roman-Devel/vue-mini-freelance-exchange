<template>
	<h1 class="text-white center" v-if="isLoad && !tasks.length">Задач пока нет</h1>
	<div class="loader" v-if="!tasks.length && !isLoad"></div>

	<template v-if="tasks.length">
		<h3 class="text-white">Всего активных задач: {{ total }}</h3>
		<TasksList  />
	</template>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import axios from 'axios'
import TasksList from '../components/TasksList.vue'

export default {
	setup() {
		const store = useStore()

		const total = computed(() => store.getters.total)
		const tasks = computed(() => store.getters.tasks)

		const isLoad = ref(false)

		onMounted(async() => {
			try {
				const {data} = await axios.get(process.env.VUE_APP_DB_URL + '.json')

				if (data) {
					setTimeout(() => {
						store.commit('addTasks', Object.keys(data).map(key => {
							return { ...data[key] }
						}))
						isLoad.value = true
					}, 350)
				} else {
					setTimeout(() => isLoad.value = true, 350)
				}
			} catch (e) {
				console.warn(e.message)
			}
		})

		return {
			total,
			tasks,
			isLoad
		}
	},
	components: {TasksList}
}
</script>