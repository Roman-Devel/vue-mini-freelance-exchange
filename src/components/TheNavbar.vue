<template>
	<nav class="navbar">
		<h3>
			{{ $store.state.title }}
		</h3>

		<ul class="navbar-menu">
			<li>
				<router-link to="/">Все задачи</router-link>
			</li>
			<li>
				<router-link to="/new">Создать</router-link>
			</li>
		</ul>
	</nav>
</template>