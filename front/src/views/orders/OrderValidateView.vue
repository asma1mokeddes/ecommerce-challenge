<template>
    <div>
      <h3 class="text-2xl font-semibold leading text-center mt-6 mb-6">Votre commande n'attends que vous ...</h3>
        <button @click="validationPayment" type="submit" class="px-6 py-3 font-semibold rounded-md text-gray900 bg-red400 mx-auto block">Procéder au paiement</button>
    </div>
  </template>

  
  <script>
  import axiosInstance from "@/utils/axiosInstance";
  
  export default {
    data() {
      return {
        orderId: this.$route.params.orderId,
      };
    },
    methods: {
      async validationPayment() {
        try {
          const response = await axiosInstance.post(`http://localhost:3002/payment/`, {
            orderId: this.orderId,
          });
          const { paymentId } = response.data;
          const token = localStorage.getItem('token'); 

          const response2 = await axiosInstance.get(`http://localhost:3002/payment/session/${paymentId}`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          window.location.href = response2.data.url;
        } catch (error) {
          console.error("Error updating order:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  