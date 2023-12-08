<script setup>
import { reactive, onMounted } from "vue";
import axiosInstance from "@/utils/axiosInstance";
import router from "@/router";

import { showToast } from "@/utils/toast";

const userId = router.currentRoute.value.params.userId;
const state = reactive({
  user: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    emailAddress: "",
    role: ""
  },
  responseMessage: "",
});

const init = async () => {
  await fetchUser();
};


const fetchUser = async () => {
  try {
    const response = await axiosInstance.get(`users/${userId}`);
    const user = response.data;
    state.user = user;

    // Formater la date pour correspondre au format du calendrier
    user.dateOfBirth = new Date(user.dateOfBirth).toISOString().split("T")[0];
    state.user.role = mapRoleFromBackend(user.role);
    return user;
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

const mapRoleFromBackend = (backendRole) => {
  const roleMappings = {
    ROLE_USER: "Utilisateur",
    ROLE_STORE_KEEPER: "Magasinier",
    ROLE_ADMIN: "Admin",
  };

  return roleMappings[backendRole] || backendRole;
};
onMounted(init);
</script>



<template>
  <div class="text-center">
      <h2 class="mt-10 font-bold text-xl">Modifier un utilisateur</h2>
  </div>
  <section class="mx-auto p-6 flex items-center justify-center">
      <form
          novalidate=""
          action=""
          class="ml-80 container flex flex-col mx-auto space-y-12"
      >
          <fieldset
              class="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm "
          >
              <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                  <div class="col-span-full sm:col-span-3">
                      <label for="firstName" class="text-sm">Nom</label>
                      <input
                          v-model="state.user.firstName"
                          type="text"
                          name="firstName"
                          id="firstName"
                          placeholder="Nom"
                          class="w-full rounded-md focus:ring focus:ri focus:ri form-field"
                      />
                  </div>
                  <div class="col-span-full sm:col-span-3">
                      <label for="lastName" class="text-sm">Prénom</label>
                      <input
                          v-model="state.user.lastName"
                          type="text"
                          name="lastName"
                          id="lastName"
                          placeholder="Prénom"
                          class="w-full rounded-md focus:ring focus:ri focus:ri border-gray700 text-gray900 form-field"
                      />
                  </div>

                  <div class="col-span-full sm:col-span-2">
                      <label for="dateOfBirth" class="text-sm"
                          >Date de naissance</label
                      >
                      <input
                          v-model="state.user.dateOfBirth"
                          type="date"
                          name="dateOfBirth"
                          id="dateOfBirth"
                          placeholder="Date de naissance"
                          class="w-full rounded-md focus:ring focus:ri focus:ri border-gray700 text-gray900 form-field"
                      />
                  </div>

                  <div class="col-span-full sm:col-span-3">
                      <label for="email" class="text-sm">Adresse email</label>
                      <input
                          v-model="state.user.emailAddress"
                          id="emailAddress"
                          type="email"
                          name="email"
                          placeholder="leroy@jenkins.com"
                          class="w-full rounded-md focus:ring focus:ri focus:ri border-gray700 text-gray900 form-field"
                      />
                  </div>

                  <div class="col-span-full sm:col-span-2">
                      <label for="role" class="text-sm">Role</label>
                      <select
                          v-model="state.user.role"
                          class="w-full rounded-md focus:ring focus:ri focus:ri border-gray700 text-gray900 custom-select form-field"
                      >
                          <option value="Utilisateur">
                              Utilisateur
                          </option>
                          <option value="Magasinier">Magasinier</option>
                          <option value="Admin">Admin</option>
                      </select>
                  </div>
              </div>
          </fieldset>
          <div class="text-center">
              <button
                  @click.prevent="updateUser"
                  class="mx-auto px-8 py-3 font-semibold dark:bg-purple500"
              >
                  Modifier
              </button>
          </div>
      </form>
  </section>
</template>

<style scoped>
.text-center {
  text-align: center;
  margin-top: 2rem;
}

.form-field {
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #000000;
  color: rgb(26, 25, 65);
}


.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: auto;
}

.form-container .shadow {
  max-width: 500px;
  width: 100%;
}

.dark\:bg-violet400 {
  background-color: #7f9cf5;
}

</style>

