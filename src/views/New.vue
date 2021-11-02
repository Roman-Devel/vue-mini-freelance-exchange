<template>
	<form class="card" @submit.prevent="submit">
		<h1>Создать новую задачу</h1>
		<div class="form-control">
			<label for="title">Название</label>
			<input type="text" id="title" v-model.trim="title">
		</div>

		<div class="form-control">
			<label for="date">Дата дэдлайна</label>
			<input type="date" id="date" v-model.trim="deadline">
		</div>

		<div class="form-control">
			<label for="description">Описание</label>
			<textarea id="description" v-model.trim="description"></textarea>
		</div>

		<button class="btn primary" :disabled="isActive">Создать</button>
	</form>
</template>


<script>
import {ref, computed} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'

export default {
	setup() {
		const router = useRouter()

		const title = ref('')
		const deadline = ref('')
		const description = ref('')

		const isActive = computed(() => !(title.value.length && deadline.value.length && description.value.length))

		const toCurrentDate = () => deadline.value.split('-').reverse().join('.')
		const currentStatus = () => {
			const dateForm = deadline.value.split('-').reverse()
			const currentDateForm = Date.parse(`${dateForm[1]}.${dateForm[0]}.${dateForm[2]}`)

			const today = new Date().toLocaleDateString().split('.')
			const currentToday = Date.parse(`${today[1]}.${today[0]}.${today[2]}`)
			return currentDateForm < currentToday ? 'cancelled' : 'active'
		}

		async function submit() {
			if (!isActive.value) {
				const {data} = await axios.post(process.env.VUE_APP_DB_URL + '.json', {
					id: Date.now(),
					title: title.value,
					deadline: toCurrentDate(),
					description: description.value,
					status: currentStatus()
				})

				await axios.patch(process.env.VUE_APP_DB_URL + data.name + '.json', { dbId: data.name })

				title.value = ''
				deadline.value = ''
				description.value = ''

				router.push('/')
			}
		}

		return {
			title,
			deadline,
			description,
			isActive,
			submit
		}
	}
}
</script>