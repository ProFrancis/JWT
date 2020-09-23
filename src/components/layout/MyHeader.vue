<template>
  <div>
    <h1>Connexion</h1>
    <svg style="margin-top:-190px"  viewBox="0 0 800 350">
      <symbol id="s-text">
        <text text-anchor="middle" x="50%" y="35%" class="text--line">Connexion</text>
      </symbol>
      
      <g class="g-ants">
        <use xlink:href="#s-text" class="text-copy"></use>     
        <use xlink:href="#s-text" class="text-copy"></use>     
        <use xlink:href="#s-text" class="text-copy"></use>     
        <use xlink:href="#s-text" class="text-copy"></use>     
        <use xlink:href="#s-text" class="text-copy"></use>     
      </g>

    </svg>
    <div style="margin-top:-100px" class="container right-panel-active ">
			<div class="container__form container--signup">
				<form action="#" class="form" id="form1">
					<h2 class="form__title">Sign Up</h2>
					<input type="text" placeholder="User" class="input" />
					<input type="email" placeholder="Email" class="input" />
					<input type="password" placeholder="Password" class="input" />
          <div class="okok">
            <div class="link">
              <span class="link__text">Sign Up</span>
            </div>
          </div>
				</form>
			</div>

			<div class="container__form container--signin">
				<form action="#" class="form" id="form2">
					<h2 class="form__title">Sign In</h2>
					<input type="email" placeholder="Email" class="input" />
					<input type="password" placeholder="Password" class="input" />
					<div class="okok">
            <div class="link">
              <span class="link__text">Sign In</span>
            </div>
          </div>
				</form>
			</div>

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
  </div>
</template>

<script>
export default {
  name: 'MyHeaders',
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

<style scoped>
@import url('./../../assets/style.css');
@import url('./../../assets/styles.css');

h1{
    padding: 1rem 15rem 1rem 15rem;
    visibility: hidden;
};
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
