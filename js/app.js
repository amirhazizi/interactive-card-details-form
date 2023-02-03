const inputs = document.querySelectorAll("input")
const previews = document.querySelectorAll(".preview")
const form = document.getElementById("form")
const errorMsg = document.querySelectorAll(".error-text")
const completed = document.querySelector(".completed")
console.log(completed.classList)
inputs.forEach(function (input) {
  input.addEventListener("keyup", function () {
    previews.forEach(function (pre) {
      if (`preview-${input.dataset.id}` == pre.dataset.id) {
        pre.textContent = input.value
      }
    })
  })
})
inputs.forEach(function (input) {
  input.addEventListener("keydown", function () {
    if (input.value && !onlyNumbers(input.value)) {
      input.style.borderColor = "hsl(279, 6%, 55%)"
    }
  })
})
form.addEventListener("submit", function (e) {
  e.preventDefault()
  inputs.forEach(function (input) {
    if (!input.value) {
      input.style.borderColor = "red"
      errorMsg.forEach(function (er) {
        if (er.dataset.id == input.dataset.id) {
          er.classList.add("active")
          er.textContent = `can't be blank`
        } else if (
          input.dataset.id == "card-month" ||
          input.dataset.id == "card-year"
        ) {
          if (er.dataset.id == "card-date") {
            er.classList.add("active")
            er.textContent = `can't be blank`
          }
        }
      })
    } else {
      if (input.dataset.id !== "card-name" && onlyNumbers(input.value)) {
        // form.classList.add("unshow-form")
        // completed.classList.add("active-completed")
      }
    }
    // else if (onlyNumbers(input.value) && input.dataset.id === "card-name") {
    //   er.classList.add("active")
    //   er.textContent = `wrong format,letter only`

    // }
  })
})
// number checker
function onlyNumbers(str) {
  return /^\d+$/.test(str)
}
// else if (!onlyNumbers(input.value) && input.dataset.id !== "card-name") {
//       input.style.borderColor = "red"
//       errorMsg.forEach(function (er) {
//         if (er.dataset.id == input.dataset.id) {
//           er.classList.add("active")
//           er.textContent = `wrong format,numbers only`
//         } else if (
//           input.dataset.id == "card-month" ||
//           input.dataset.id == "card-year"
//         ) {
//           if (er.dataset.id == "card-date") {
//             er.classList.add("active")
//             er.textContent = `wrong format,numbers only`
//           }
//         }
//       })
