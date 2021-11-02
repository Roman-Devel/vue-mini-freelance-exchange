<template>
  	<span :class="['badge', taskInfo.type]">{{ taskInfo.title }}</span>
</template>

<script>
import {computed} from 'vue'

export default {
	props: {
		type: {
			type: String,
			required: true,
			validator(value) {
				return ['active', 'done', 'cancelled', 'pending'].includes(value)
			}
		}
	},
	setup(props) {
		const taskInfo = computed(() => {

			switch (props.type) {
				case 'active':
					return {
						type: 'primary',
						title: 'Активен'
					}
				case 'done':
					return {
						type: 'primary',
						title: 'Завершен'
					}
				case 'cancelled':
					return {
						type: 'danger',
						title: 'Отменен'
					}
				case 'pending':
					return {
						type: 'warning',
						title: 'Выполняется'
					}
			}
		})

		return {
			taskInfo
		}
	}
}
</script>