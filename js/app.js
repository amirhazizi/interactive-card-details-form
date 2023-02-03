const inputs = document.querySelectorAll("input")
const previews = document.querySelectorAll(".preview")
const form = document.getElementById("form")
const errorMsg = document.querySelectorAll(".error-text")
inputs.forEach(function (input) {
  input.addEventListener("keyup", function () {
    previews.forEach(function (pre) {
      if (`preview-${input.dataset.id}` == pre.dataset.id) {
        pre.textContent = input.value
      }
    })
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
        } else {
          //
        }
      })
    }
  })
})
