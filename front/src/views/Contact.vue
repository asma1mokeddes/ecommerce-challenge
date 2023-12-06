<template>
    <section class="flex items-center justify-center min-h-screen bg-gray900">
        <div
            class="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x bg-gray900 text-gray100"
        >
            <div class="py-6 md:py-0 md:px-6">
                <h1 class="text-4xl font-bold mb-4">Contactez-nous</h1>
                <p class="pt-2 pb-4 mb-4">
                    Avez-vous des questions ou des commentaires? Nous serions
                    ravis d'entendre parler de vous.
                </p>
                <div class="space-y-4">
                    <p class="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="w-5 h-5 mr-2 sm:mr-6"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span>21 Rue des carrières, 92700 Colombes</span>
                    </p>
                    <p class="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="w-5 h-5 mr-2 sm:mr-6"
                        >
                            <path
                                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                            ></path>
                        </svg>
                        <span>0604574806</span>
                    </p>
                    <p class="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="w-5 h-5 mr-2 sm:mr-6"
                        >
                            <path
                                d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                            ></path>
                            <path
                                d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                            ></path>
                        </svg>
                        <span>marchemagique@gmail.com</span>
                    </p>
                </div>
            </div>
            <form
                novalidate=""
                class="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
            >
                <label class="block">
                    <span class="block mb-2 text-sm">Nom complet</span>
                    <input
                        type="text"
                        placeholder="Leroy Jenkins"
                        class="w-full px-3 py-2 border rounded-md border-gray700 bg-gray900 text-gray100"
                    />
                </label>

                <label class="block">
                    <span class="block mb-2 text-sm">Type de demandes</span>
                    <select
                        class="w-full px-3 py-2 border rounded-md border-gray700 bg-gray900 text-gray100"
                    >
                        <option value="Question">
                            Question sur un produit
                        </option>
                        <option value="Commande">Suivi de commande</option>
                        <option value="Retour">Demande de retour</option>
                        <option value="Réclamation">Réclamation</option>
                        <option value="Autre">Autre</option>
                    </select>
                </label>

                <label class="block">
                    <span class="block mb-2 text-sm">Adresse email</span>
                    <input
                        type="email"
                        placeholder="leroy@jenkins.com"
                        class="w-full px-3 py-2 border rounded-md border-gray700 bg-gray900 text-gray100"
                    />
                </label>
                <label class="block">
                    <span class="block mb-2 text-sm">Votre message</span>
                    <textarea
                        rows="3"
                        placeholder="Votre message ici"
                        class="block w-full px-3 py-2 border rounded-md border-gray700 bg-gray900 text-gray100"
                    ></textarea>
                </label>
                <button
                    type="button"
                    class="self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ri bg-violet400 text-gray900 focus:ri hover:ri"
                >
                    Envoyer
                </button>
            </form>
        </div>
    </section>
</template>
