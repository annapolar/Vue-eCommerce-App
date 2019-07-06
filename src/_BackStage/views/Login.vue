<template>
  <div class="login-wrap">
    <div class="login">
      <div class="login-overlay">
        <form class="form-signin" @submit.prevent="signin">
          <div class="login-title">Sing In</div>
          <div class="login-description">
            Sign in with your email or user name. Don’t remember your user name or password?
            <a
              href="#"
            >Click here</a>
          </div>
          <label for="inputEmail" class="sr-only">Email</label>
          <input
            v-model="user.username"
            type="email"
            id="inputEmail"
            placeholder="Email"
            required
            autofocus
          />
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            v-model="user.password"
            type="password"
            id="inputPassword"
            placeholder="Password"
            required
          />
          <Button v-bind="loginBtnScheme" class="login-btn" type="submit" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      loginBtnScheme: {
        content: "Sign In",
        fullWidth: true,
        btnStyle: "primary"
      }
    };
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_API}/admin/signin`;
      this.$http.post(api, this.user).then(res => {
        if (res.data.success) {
          this.$router.push("/admin/productlist");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-wrap {
  @include size(100%, 100vh);
  background-attachment: fixed;
  background-image: url("~@/assets/login-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  .login {
    @include size(50%, 100vh);
    position: absolute;
    background: inherit;
    overflow: hidden;

    &:before {
      content: "";
      background: inherit;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      filter: blur(20px);
    }

    .login-overlay {
      @include size(100%, 100vh);
      @include flexCenter;
      background-color: rgba(#f5f9fb, 0.5);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;

      .form-signin {
        width: 100%;
        max-width: 450px;
        padding: 15px;
        margin: auto;

        .login-title {
          @include fontStyle(30px, 400, 30px, normal);
          margin-bottom: 20px;
        }
        .login-description {
          @include fontStyle(14px, 300, 1.4, normal);
          color: $bluegray-deep;
          letter-spacing: 0.3px;
          margin-bottom: 36px;
        }

        input {
          font-family: "Nunito Sans", sans-serif;
          border-radius: 2px;
          margin: 4px 0;
          border: none;
          color: $dark;
          height: 48px;
        }

        .login-btn {
          margin: 18px 0;
        }
      }
    }
  }
}
@media only screen and (max-width: 769px) {
  .login-wrap {
    .login {
      @include size(500px, 500px);
      top: 50%;
      left: 50%;
      margin-left: -250px;
      margin-top: -250px;
      border-radius: 8px;
      box-shadow: 0 0 30px rgba($dark, 0.2);

      .login-overlay {
        @include size(500px, 500px);
      }
    }
  }
}

@media only screen and (max-width: 580px) {
  .login-wrap {
    .login {
      @include size(360px, 500px);
      margin-left: -180px;

      .login-overlay {
        @include size(360px, 500px);
      }
    }
  }
}
</style>