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
			if (props.type === 'active') 	{
				return {
					type: 'primary',
					title: 'Активен'
				}
			}
			if (props.type === 'done') 		{
				return {
					type: 'primary',
					title: 'Завершен'
				}
			}
			if (props.type === 'cancelled') {
				return {
					type: 'danger',
					title: 'Отменен'
				}
			}
			if (props.type === 'pending') 	{
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