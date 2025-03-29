// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const hearts = document.querySelectorAll('.like-glyph');
const errorModal = document.querySelector('#modal');

// Add hidden class to modal initially (could also be done in HTML)
errorModal.classList.add('hidden');

// Add event listener to each heart
hearts.forEach(heart => {
    heart.addEventListener('click', () => {
        if (!heart.classList.contains('activated-heart')) {
            mimicServerCall()
                .then(() => {
                    heart.innerHTML = FULL_HEART;
                    heart.classList.add('activated-heart');
                })
                .catch((error) => {
                    errorModal.classList.remove('hidden');
                    document.querySelector('#modal-message').textContent = error;
                    setTimeout(() => {
                        errorModal.classList.add('hidden');
                    }, 3000);
                });
        } else {
            heart.innerHTML = EMPTY_HEART;
            heart.classList.remove('activated-heart');
        }
    });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}