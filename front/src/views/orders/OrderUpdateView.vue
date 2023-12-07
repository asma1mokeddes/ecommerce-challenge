<template>
    <div>
      <h3 class="text-2xl font-semibold leading text-center mb-6">Modifier la commande</h3>
      <form @submit.prevent="updateOrder" class="max-w-md mx-auto">
        <div class="mb-4">
          <label for="address" class="block text-sm font-medium text-gray-700">Adresse de livraison</label>
          <input v-model="updatedAddress" type="text" id="address" class="mt-1 p-2 w-full rounded-md focus:ring focus:border-indigo-300 border-gray-300">
        </div>
        <div class="mb-4">
          <label for="status" class="block text-sm font-medium text-gray-700">Statut de la commande</label>
          <select v-model="updatedStatus" id="status" class="mt-1 p-2 w-full rounded-md focus:ring focus:border-indigo-300 border-gray-300">
            <option value="en attente de paiement">En attente de paiement</option>
            <option value="paiement échoué">Paiement échoué</option>
            <option value="payé">Payé</option>
            <option value="en cours d'expédition">En cours d'expédition</option>
            <option value="expédié">Expédié</option>
            <option value="livré">Livré</option>
          </select>
        </div>
        <button type="submit" class="px-3 py-1 font-semibold rounded-md text-gray900 bg-red400 mx-auto block">Enregistrer les modifications</button>
      </form>
    </div>
  </template>
  
  
  <script>
  import axiosInstance from "@/utils/axiosInstance";
  
  export default {
    data() {
      return {
        orderId: this.$route.params.orderId,
        updatedAddress: "",
        updatedStatus: "",
      };
    },
    methods: {
      async updateOrder() {
        try {
          await axiosInstance.put(`http://localhost:3002/order/${this.orderId}`, {
            deliveryAddress: this.updatedAddress,
            orderStatus: this.updatedStatus,
          });
          this.$router.push("/orders");
        } catch (error) {
          console.error("Error updating order:", error);
        }
      },
      async fetchOrderDetails() {
        try {
          const response = await axiosInstance.get(`http://localhost:3002/order/${this.orderId}`);
          const orderDetails = response.data;
          this.updatedAddress = orderDetails.addressUser;
          this.updatedStatus = orderDetails.orderStatus;
        } catch (error) {
          console.error("Error fetching order details:", error);
        }
      },
    },
    mounted() {
      this.fetchOrderDetails();
    },
  };
  </script>
  
  <style scoped>
  </style>
  