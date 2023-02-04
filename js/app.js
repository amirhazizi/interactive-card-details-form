const inputs = document.querySelectorAll("input")
const previews = document.querySelectorAll(".preview")
const form = document.getElementById("form")
const errorMsg = document.querySelectorAll(".error-text")
const completed = document.querySelector(".completed")

// preview change lifetime
inputs.forEach(function (input) {
  input.addEventListener("keyup", function () {
    previews.forEach(function (pre) {
      if (`preview-${input.dataset.id}` == pre.dataset.id) {
        pre.textContent = input.value
      }
    })
  })
})
// form submit event
form.addEventListener("submit", function (e) {
  let valid = 0
  e.preventDefault()
  inputs.forEach(function (input) {
    const value = input.value
    const id = input.dataset.id
    if (!value) {
      showError(input, id, "blank")
    } else if (id === "card-number" && !creditNumber(value)) {
      showError(input, id, "format")
      console.log("number")
    } else if (
      id !== "card-name" &&
      id !== "card-number" &&
      !onlyNumbers(value)
    ) {
      showError(input, id, "format")
    } else {
      if (id === "card-number" && value.length < 16) {
        showError(input, id, "invalid")
      } else if (
        id === "card-month" &&
        value.length >= 2 &&
        parseInt(value) > 12
      ) {
        showError(input, id, "invalid")
      } else if (id === "card-year" && value.length != 2) {
        showError(input, id, "invalid")
      } else if (id === "card-cvc" && value.length !== 3) {
        showError(input, id, "invalid")
      } else {
        unShowError(input, id)
        valid++
        if (inputs.length === valid) {
          form.classList.add("unshow-form")
          completed.classList.add("active-completed")
        }
      }
    }
  })
})
// number checker
function onlyNumbers(str) {
  return /^\d+$/.test(str)
}
// credit card number checker
function creditNumber(str) {
  var myRegExp = /[0-9]{4}?[-\s]?[0-9]{4}[-\s]?[0-9]{4}[-\s]?[0-9]{4}$/im
  return myRegExp.test(str)
}
// show error function
function showError(input, id, action) {
  input.style.borderColor = "red"
  errorMsg.forEach(function (er) {
    if (er.dataset.id == id) {
      addClass(er, action)
    } else if (id === "card-month" || id === "card-year") {
      if (er.dataset.id == "card-date") {
        addClass(er, action)
      }
    }
  })
}
// show error and change error text
function addClass(er, action) {
  er.classList.add("active")
  if (action == "blank") {
    er.textContent = `can't be blank`
  } else if (action == "format") {
    er.textContent = `wrong format numbers only`
  } else {
    er.textContent = `unvalid number`
  }
}
// unshow Error function
function unShowError(input, id) {
  input.style.borderColor = "hsl(279, 6%, 55%)"
  errorMsg.forEach(function (er) {
    if (er.dataset.id == id) {
      er.classList.remove("active")
      er.textContent = ``
    } else if (id == "card-month") {
      if (er.dataset.id == "card-date") {
        er.classList.remove("active")
        er.textContent = ``
      }
    }
  })
}
