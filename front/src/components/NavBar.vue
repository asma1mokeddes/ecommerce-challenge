<template>
<header class="p-4 dark:bg-gray800 dark:text-gray100">
	<div class="container flex justify-between h-16 mx-auto">
		<a rel="noopener noreferrer" href="/login" aria-label="Back to homepage" class="flex items-center p-2">
			<img src="../assets/marcheMagique.png" alt="Mon logo" class="w-32 h-23 text-violet400">
		</a>
		<ul class="items-stretch hidden space-x-3 lg:flex">
			<li class="flex">
				<a rel="noopener noreferrer" href="/products" class="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Produits</a>
			</li>
			<li class="flex">
				<a rel="noopener noreferrer" href="#" class="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Hommes</a>
			</li>
			<li class="flex">
				<a rel="noopener noreferrer" href="#" class="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">Femmes</a>
			</li>
		</ul>
    <div class="items-center flex-shrink-0 hidden lg:flex">
  <a href="/login" class="self-center px-8 py-3 rounded">Se connecter</a>
  <a href="/inscription" class="self-center px-8 py-3 font-semibold rounded dark:bg-violet400 dark:text-gray900">S'inscrire</a>
</div>

		<button class="p-4 lg:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 dark:text-gray100">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
			</svg>
		</button>
	</div>
</header>
</template>
