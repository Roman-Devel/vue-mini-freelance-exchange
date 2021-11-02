<template>
	<h1 class="text-white center" v-if="isLoad && !getters.tasks.length">Задач пока нет</h1>
	<div class="loader" v-if="!getters.tasks.length && !isLoad"></div>

	<template v-if="getters.tasks.length">
		<h3 class="text-white">Всего активных задач: {{ getters.total }}</h3>
		<div class="card" v-for="task in getters.tasks" :key="task.dbId">
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
</template>

<script>
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import axios from 'axios'
import AppStatus from '../components/AppStatus'

export default {
	setup() {
		const router = useRouter()
		const store = useStore()
		const getters = store.getters

		const isLoad = ref(false)

		function insideTask(id) {
			router.push('/task/' + id)
		}

		onMounted(async() => {
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
		})

		return {
			insideTask,
			getters,
			isLoad
		}
	},
	components: {AppStatus}
}
</script>