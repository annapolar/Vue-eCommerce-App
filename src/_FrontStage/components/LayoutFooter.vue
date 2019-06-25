<template>
  <div class="footer-wrap">
    <div class="footer-container">
      <div class="footer-left">
        <div class="footer-section">
          <h5>Category</h5>
          <ul>
            <li>Bedroom</li>
            <li>Kitchen</li>
            <li>Modren Chair</li>
            <li>Styling Lamp</li>
            <li>Living Room</li>
          </ul>
        </div>
        <div class="footer-section">
          <h5>About</h5>
          <ul>
            <li>Our Team</li>
            <li>Our Story</li>
            <li>News</li>
            <li>Contact</li>
          </ul>
        </div>
        <div class="footer-section">
          <h5>Follow Us</h5>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>Google +</li>
          </ul>
        </div>
      </div>
      <div class="footer-right">
        <div class="footer-section">
          <div class="footer-logo"></div>
          <div
            class="footer-description"
          >In the tumultuous business of cutting-in and attending to a whale, there is much running backwards and forwards among the crew. Now hands are wanted here, and then again hands are wanted there. There is no staying in any one place.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer-wrap {
  background-color: $dark;
  @include size(100%);
  padding: 60px 0;

  .footer-container {
    width: 100%;
    max-width: 1140px;
    display: flex;
    margin: 0 auto;

    .footer-left {
      display: flex;
      width: 50%;

      .footer-section {
        padding: 0 40px;
        flex-grow: 1;

        h5 {
          color: #fff;
          text-transform: uppercase;
          margin-bottom: 25px;
        }

        ul {
          li {
            font-size: 14px;
            line-height: 2;
            color: $gray-light;
            cursor: pointer;

            &:hover {
              color: var(--primary);
            }
          }
        }
      }
    }
    .footer-right {
      width: 50%;

      .footer-section {
        padding: 0 40px;

        .footer-logo {
          @include size(287px, 22px);
          background: url("../../assets/logo-footer.svg") no-repeat center
            center;
          background-size: contain;
          margin-bottom: 25px;
        }

        .footer-description {
          font-size: 14px;
          color: $gray-mid;
          line-height: 1.5;
        }
      }
    }
  }
}

@media only screen and (max-width: 1080px) {
  .footer-wrap {
    .footer-container {
      .footer-left,
      .footer-right {
        width: 50%;
        .footer-section {
          padding: 0 20px;
        }
      }
    }
  }
}

@media only screen and (max-width: 769px) {
  .footer-wrap {
    padding: 40px 0;
    .footer-container {
      .footer-left,
      .footer-right {
        .footer-section {
          padding: 0 15px;
        }
      }
    }
  }
}
@media only screen and (max-width: 580px) {
  .footer-wrap {
    .footer-container {
      flex-direction: column;
      .footer-left,
      .footer-right {
        width: 100%;
        margin: 20px 0;
      }
    }
  }
}
</style>
