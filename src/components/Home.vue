<template>
  <div style="margin-top:-100px" class="container right-panel-active ">
    <SignUp/>
    <SignIn/>
    <div class="container__overlay">
      <div class="overlay">
        <div class="overlay__panel overlay--left">
          <button class="btn" id="signIn">Sign In</button>
        </div>
        <div class="overlay__panel overlay--right">
          <button class="btn" id="signUp">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignUp from './SignUpForm'
import SignIn from './SignInForm'

export default {
  components: { SignUp, SignIn },
  props: {
    route: String,
  },
  mounted: function(){
    const signInBtn = document.getElementById("signIn");
    const signUpBtn = document.getElementById("signUp");
    const fistForm = document.getElementById("form1");
    const secondForm = document.getElementById("form2");
    const container = document.querySelector(".container");

    signInBtn.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    signUpBtn.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    fistForm.addEventListener("submit", (e) => e.preventDefault());
    secondForm.addEventListener("submit", (e) => e.preventDefault());
  }
}
</script>

<style>
@import url('./../assets/style.css');
.marge{
  margin-top: -100px;
};
.okok{
	align-items: center;
	display: grid;
	height: 100%;
	justify-content: center;
}
</style>