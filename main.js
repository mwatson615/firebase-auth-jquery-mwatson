//1. logout button
//2. register button
//3. any errors catch with alert


var config = {
    apiKey: "AIzaSyDI7FGhUTCRvVh4BJ-pglbaYaJwhoobGYA",
    authDomain: "jquery-auth-practice.firebaseapp.com",
    databaseURL: "https://jquery-auth-practice.firebaseio.com",
    storageBucket: "jquery-auth-practice.appspot.com",
    messagingSenderId: "1064329337509"
  };
  firebase.initializeApp(config);

//log in
$('.login-page form').submit(function(e) {
	var email = $('input[type="email"]').val();
	var password = $('input[type="password"]').val();
	// $('form').empty();
	firebase
	.auth()
	.signInWithEmailAndPassword(email, password)

	e.preventDefault();
})

//sign out
$('.sign-out').click((e) => {
	firebase.auth().signOut()
	console.log("You are signed out");
})

//register
$(".register").click((e) => {
	console.log("hi")
	var email = $('input[type="email"]').val();
	var password = $('input[type="password"]').val();
firebase.auth().createUserWithEmailAndPassword(email, password)
.catch(function(error) {
  // Handle Errors here.
  // var errorCode = error.code;
  // var errorMessage = error.message;
  alert("Woops! Error!")
});
});

//todo inputs
//*****************************************************JSON.stringify()
$('.main-page form').submit((e) => {
	var task = $('.main-page input[type="text"]').val();
	var uid = firebase.auth().currentUser.uid
	$.post(`https://jquery-auth-practice.firebaseio.com/${uid}.json`,
	JSON.stringify({ task: task })
	).then(console.log(uid + task))
	e.preventDefault();
})

//firebase has evt listener for login and logout
  firebase.auth().onAuthStateChanged(() => {
  	if(firebase.auth().currentUser !== null) {
  	$('.login-page').addClass('hidden');
	$('.main-page').removeClass('hidden')
	var email = firebase.auth().currentUser.email;
	$('.main-page h1').text(`Welcome ${email}`)
  } else {
  	$('.login-page').removeClass('hidden');
	$('.main-page').addClass('hidden')
  }
  })
