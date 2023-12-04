<script setup>
import { reactive } from "vue"; // Importez ref pour créer des références réactives
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { mdiAccount, mdiAccountPlusOutline, mdiMail } from "@mdi/js";
import router from "@/router";
import axiosInstance from "@/utils/axiosInstance";
import "vue-select/dist/vue-select.css";
import { languages } from "@/data/languages";
import { showToast } from "@/utils/toast";

const userId = router.currentRoute.value.params.userId;
const state = reactive({
  user: {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    companies: [],
    skills: [],
    points: null,
  },
  companies: [],
  responseMessage: "",
});

const init = async () => {
  await fetchUser();
  await fetchCompanies();
};

const fetchCompanies = async () => {
  try {
    state.companies = await axiosInstance.get("companies").then((response) => {
      return response.data;
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
  }
};

const fetchUser = async () => {
  try {
    state.user = await axiosInstance.get(`users/${userId}`).then((response) => {
      return response.data;
    });
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const updateUser = async () => {
  try {
    await axiosInstance
      .put(`users/${userId}`, state.user)
      .then((response) => {
        state.responseMessage = response.data.message;
        setTimeout(() => {
          showToast(state.responseMessage);
        }, 3000);
        router.push("/users");
      });
  } catch (error) {
    showToast(error);
    console.error("Error updating user:", error);
  }
};

init();
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiAccountPlusOutline"
        title="Modifier l'utilisateur"
        main
      />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 form-container">
        <!-- Formulaire de création d'utilisateur -->
        <CardBox is-form class="shadow" @submit.prevent="updateUser">
          <FormField label="Nom" help="Votre nom">
            <FormControl
              v-model="state.user.firstname"
              :icon="mdiAccount"
              name="username"
              required
              autocomplete="username"
            />
          </FormField>

          <FormField label="Prénom" help="Votre prénom">
            <FormControl
              v-model="state.user.lastname"
              :icon="mdiAccount"
              name="username"
              required
              autocomplete="username"
            />
          </FormField>

          <FormField label="Entreprise" help="Sélectionnez votre entreprise">
            <v-select
              v-model="state.user.companies"
              :options="state.companies"
              :reduce="(company) => company._id"
              label="name"
            />
          </FormField>

          <FormField label="Compétences" help="Vos compétences">
            <v-select
              v-model="state.user.skills"
              :options="languages"
              multiple
            />
          </FormField>

          <FormField label="Points" help="Ajouter des points (max 1000)">
            <FormControl
                v-model="state.user.points"
                :icon="mdiAccount"
                name="points"
                required
                autocomplete="points"
            />
          </FormField>

          <FormField label="Adresse" help="Votre adresse postale">
            <FormControl
              v-model="state.user.address"
              :icon="mdiAccount"
              name="address"
              required
              autocomplete="address"
            />
          </FormField>

          <FormField label="Email" help="Votre adresse email">
            <FormControl
              v-model="state.user.email"
              :icon="mdiMail"
              name="email"
              type="email"
              required
              autocomplete="email"
            />
          </FormField>

          <FormField
            label="Numéro de téléphone"
            help="Votre numéro de téléphone"
          >
            <FormControl
              v-model="state.user.phone"
              :icon="mdiAccount"
              name="tel"
              type="tel"
              required
              autocomplete="tel"
            />
          </FormField>
          <!-- Autres champs du formulaire ici -->
          <template #footer>
            <BaseButtons>
              <button
                  type="submit"
                  class="rounded-full bg-[#00BB7E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
              >
                Modifier l'utilisateur
              </button>
            </BaseButtons>
          </template>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<style>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: auto;
}

.form-container .shadow {
  max-width: 500px; /* Adjust this value as needed to control the maximum width of the form */
  width: 100%; /* Ensure the form takes the available width within the container */
}

.button {
  width: 300px;
  justify-content: center;
  align-items: center;
  background-color: #d62020;
  margin-left: 50px;
}
</style>
