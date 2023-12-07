<template>
    <div class="container p-2 mx-auto sm:p-4 dark:text-gray100">
      <h3 class="mb-4 text-2xl font-semibold leadi text-center">Commandes</h3>

      <div class="overflow-x-auto">
        <table class="min-w-full text-xs">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col class="w-24" />
          </colgroup>
          <thead class="bg-gray700">
            <tr class="text-left">
              <th class="p-3">ID de la commande</th>
              <th class="p-3">Adresse de livraison</th>
              <th class="p-3">Statut de la commande</th>
              <th class="p-3 text-right">Utilisateur</th>
              <th class="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in state.orders"
              :key="order.orderId"
              class="border-b border-opacity-20 border-gray700"
            >
              <td class="p-3">
                <p>{{ order.orderId }}</p>
              </td>
              <td class="p-3">
                <p>{{ order.addressUser }}</p>
              </td>
              <td class="p-3">
                <p class="text-gray400">{{ order.orderStatus }}</p>
              </td>
              <td class="p-3 text-right">
                <p>{{ order.user.firstName }} {{ order.user.lastName }}</p>
              </td>
  
              <td class="p-3">
                <span class="px-3 py-1 font-semibold rounded-md dark:bg-violet400 text-gray900">
                  <button
                    class="text-black-300 hover:text-green-800 cursor-pointer"
                    @click=""
                  >
                    <EyeIcon class="h-4 w-4" />
                  </button>
                  <a
                    class="text-black-300 hover:text-green-800 cursor-pointer"
                    @click="editOrder(order.orderId)"
                    ><font-awesome-icon :icon="['fas', 'edit']" />
                  </a>
                  <a
                    class="text-red-600 hover:text-red-800 cursor-pointer"
                    @click="deleteOrder(order.orderId)"
                  >
                    <font-awesome-icon :icon="['fas', 'trash-alt']" /></a
                  >
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  
    <div class="flex justify-center space-x-1 dark:text-gray100">
      <button
        title="previous"
        type="button"
        class="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray900 dark:border-gray800"
      >
        <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="w-4">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button
        type="button"
        title="Page 1"
        class="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray900 dark:text-violet400 dark:border-violet400"
      >
        1
      </button>
      <!-- Ajoutez ici des boutons supplémentaires pour les pages -->
      <button
        title="next"
        type="button"
        class="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray900 dark:border-gray800"
      >
        <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="w-4">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  </template>
  
  <script>
  import { reactive } from "vue";
  import axiosInstance from "@/utils/axiosInstance";
  import { showToast } from "@/utils/toast";
  import { EyeIcon } from "@heroicons/vue/20/solid";
  
  export default {
    data() {
      return {
        state: reactive({
          orders: [],
        }),
      };
    },
  
    methods: {
      async init() {
        await this.fetchOrders();
      },
  
      async fetchOrders() {
        try {
            const userId = this.$route.params.userId;
          this.state.orders = await axiosInstance
            .get(`order/user/${userId}`)
            .then((response) => {
                console.log(response.data)
              return response.data;
            });
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      },
  
      async deleteOrder(orderId) {
        if (
          confirm(
            `Êtes-vous certain de vouloir procéder à la suppression de cette commande ?`
          )
        ) {
          try {
            const response = await axiosInstance.delete(`order/${orderId}`);
            showToast(response.data.message);
            await this.fetchOrders();
          } catch (error) {
            console.error("Erreur lors de la suppression de la commande:", error);
          }
        }
      },
      editOrder(orderId) {
        this.$router.push(`/orders/update/${orderId}`);
      },
    },
  
    mounted() {
      this.init();
    },
  };
  </script>
  
  <style scoped></style>
  