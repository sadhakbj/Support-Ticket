<template>
  <div class="p-6 bg-indigo-800 min-h-screen flex justify-center items-center">
    <div class="w-full max-w-md">
      <!-- <logo class="block mx-auto w-full max-w-xs fill-white" height="50" /> -->
      <form class="mt-8 bg-white rounded-lg shadow-xl overflow-hidden" @submit.prevent="submit">
        <div class="px-10 py-12">
          <h1 class="text-center font-bold text-3xl">Welcome Back!</h1>
          <div class="mx-auto mt-6 w-24 border-b-2" />
          <div class="mb-5">
            <label class="form-label">Email:</label>
            <input
              class="form-input mt-2 bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300"
              placeholder="Email"
              type="text"
            />
          </div>

          <div class="mb-5">
            <label class="form-label">Password:</label>
            <input
              class="form-input bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300"
              placeholder="Email"
              type="password"
            />
          </div>
          <label class="mt-6 select-none flex items-center" for="remember">
            <input id="remember" v-model="form.remember" class="mr-1" type="checkbox" />
            <span class="text-sm">Remember Me</span>
          </label>
        </div>
        <div class="px-10 py-4 bg-gray-100 border-t border-gray-200 flex justify-between items-center">
          <a class="hover:underline" tabindex="-1" href="#reset-password">Forget password?</a>
          <loading-button :loading="sending" class="btn-indigo" type="submit">Login</loading-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import LoadingButton from "@/components/shared/LoadingButton.vue"
// import Logo from "@/Shared/Logo"
export default {
  metaInfo: { title: "Login" },
  components: {
    LoadingButton
    // Logo,
  },
  props: {
    errors: Object
  },
  data() {
    return {
      sending: false,
      form: {
        email: "johndoe@example.com",
        password: "secret",
        remember: null
      }
    }
  },
  methods: {
    submit() {
      this.sending = true
      setTimeout(() => {
        this.sending = false
      }, 1500)
      const data = {
        email: this.form.email,
        password: this.form.password,
        remember: this.form.remember
      }

      console.log(data)
    }
  }
}
</script>
