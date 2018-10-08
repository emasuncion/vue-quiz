<template>
  <v-app>
    <toolbar :login="login" />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
  import { mapActions } from 'vuex'
  import Toolbar from '@components/Toolbar'

  export default {
    name: 'app',
    components: {
      Toolbar
    },
    methods: {
      ...mapActions('user', {
        login: 'login'
      })
    }
  }
</script>
