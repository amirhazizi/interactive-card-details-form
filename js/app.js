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
    } else if (!onlyNumbers(input.value)) {
      if (input.dataset.id !== "card-name") {
        input.style.borderColor = "red"
        errorMsg.forEach(function (er) {
          if (er.dataset.id == input.dataset.id) {
            er.classList.add("active")
            er.textContent = `wrong format,numbers only`
          } else if (
            input.dataset.id == "card-month" ||
            input.dataset.id == "card-year"
          ) {
            if (er.dataset.id == "card-date") {
              er.classList.add("active")
              er.textContent = `wrong format,numbers only`
            }
          }
        })
      }
    } else {
      form.classList.add("unshow-form")
      completed.classList.add("active-completed")
      console.log(completed.classList)
    }
  })
})
//    {
// else if (!onlyNumbers(input.value)) {
//       if (input.dataset.id !== "card-name") {
//         errorMsg.forEach(function (er) {
//             if (er.dataset.id == input.dataset.id) {
//             er.classList.add("active")
//             er.textContent = `wrong format,numbers only`}
//         })
//         // else if (
//     //       input.dataset.id == "card-month" ||
//     //       input.dataset.id == "card-year"
//     //     ) {
//     //       if (er.dataset.id == "card-date") {
//     //         er.classList.add("active")
//     //         er.textContent = `wrong format,numbers only`
//     //       }
//     //     }
//     //   }
//   }

// number checker
function onlyNumbers(str) {
  return /^\d+$/.test(str)
}
