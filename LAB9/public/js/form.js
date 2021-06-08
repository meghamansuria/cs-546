// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 9 - public/js/form.js
(function () {
  // find fibonacci of the given number
  function fibonacci(num) {
    // if num is negative
    if (isNaN(num)) {
      throw "Please enter a NUMBER"
    }
    if (num < 0) {
      throw "Please enter a NON-NEGATIVE number"
    }
    let num1 = 0;
    let num2 = 1;
    if (num == 0) { // fib(0) = 0
      return num1;
    }
    if (num == 1) { // fib(1) = 1
      return num2;
    }
    // fib(>1) = compute
    let result = 0;
    for (i = 0; i < num - 1; i++) {
      result = num1 + num2;
      num1 = num2;
      num2 = result;
    }
    return num2;
  }
  // decide if the given number is a prime number
  function prime(num2) {
    // num 0, 1 are not prime
    if (num2 < 2) {
      return false;
    }
    // check if prime
    for (let i = 2; i < num2; i++) {
      if (num2 % i == 0) return false;
    }
    return true;
  }

  const fibForm = document.getElementById('fibForm');

  if (fibForm) {
    // We can store references to our elements; it's better to
    // store them once rather than re-query the DOM traversal each time
    // that the event runs.
    const index = document.getElementById('index');
    const errorContainer = document.getElementById('error-container');
    const errorTextElement = errorContainer.getElementsByClassName(
      'text-goes-here'
    )[0];
    let myUl = document.getElementById('results');

    // We can take advantage of functional scoping; our event listener has access to its outer functional scope
    // This means that these variables are accessible in our callback
    // wait for submit and then try to calculate
    fibForm.addEventListener('submit', (event) => {
      event.preventDefault();
      try {
        // hide containers by default
        errorContainer.classList.add('hidden');

        // Values come from inputs as strings, no matter what :(
        const indexVal = index.value;
        const parsedIndex = parseInt(indexVal);

        // calculate the fibs and primes
        const fibResult = fibonacci(parsedIndex);
        const primeResult = prime(fibResult);

        // decide if it should be in green (prime) or red (not prime)
        let li = document.createElement('li');
        li.innerHTML = "The Fibonacci of " + parsedIndex.toString() + " is " + fibResult.toString() + ".";

        if (primeResult) { // is prime
          li.className = "is-prime";
          myUl.appendChild(li);
        }
        else { // not prime
          li.className = "not-prime";
          myUl.appendChild(li);
        }
        fibForm.reset();
      } catch (e) { // error message shown
        const message = typeof e === 'string' ? e : e.message;
        errorTextElement.innerHTML = e;
        errorContainer.classList.remove('hidden'); // unhide the error message
        fibForm.reset();
      }
    });
  }
})();