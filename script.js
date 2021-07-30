const form = document.querySelector("form")
const firstName = form.querySelector("#first_name").focus()

const allFormInputInfo = [
  {
    name: "name_title",
    type: "text",
    validation: "normalText",
    require: false,
    error: "none"
  },
  {
    name: "first_name",
    type: "text",
    validation: "normalText",
    require: true,
    error: "Please fill out this field."
  },
  {
    name: "last_name",
    type: "text",
    validation: "normalText",
    require: true,
    error: "Please fill out this field."
  },
  {
    name: "email",
    type: "text",
    validation: "email",
    require: false,
    error: "none"
  },
  {
    name: "gender",
    type: "select",
    require: true,
    error: "Please choose an option"
  },
  {
    name: "social_media",
    type: "radio",
    require: true,
    error: "Please choose an option"
  },
  {
    name: "currency",
    type: "checkbox",
    require: true,
    error: "Please check at least one option"
  }
]

allFormInputInfo.forEach((inputInfo) => {
  checkValidation(inputInfo)
})

function checkValidation(inputInfo) {
  if (inputInfo.type === "text") {
    checkTextInputValidation(inputInfo)
  } else if (inputInfo.type === "select") {
    const input = form.querySelector(`select[name="${inputInfo.name}"]`)
    if (inputInfo.require) {
      input.addEventListener("change", () => {
        if (input.value === "") {
          inputInfo.error = validationRespone(
            input,
            "error",
            "Please choose an option."
          )
          return
        }
        inputInfo.error = validationRespone(input, "ok")
      })
    }
  } else if (inputInfo.type === "radio") {
    const inputs = Array.from(
      form.querySelectorAll(`input[name="${inputInfo.name}"]`)
    )
    if (inputInfo.require) {
      inputs.forEach((input) => {
        input.addEventListener("click", () => {
          input.closest(".radio_input_container").classList.add("ok")
          input.closest(".radio_input_container").classList.remove("error")
          inputInfo.error = "none"
        })
      })
    }
  } else if (inputInfo.type === "checkbox") {
    const inputs = Array.from(
      document.querySelectorAll(`input[name="${inputInfo.name}"]`)
    )
    if (inputInfo.require) {
      inputs.forEach((input) => {
        input.addEventListener("click", () => {
          const checkboxContainer = input.closest(".radio_input_container")
          const errorDisplayer =
            checkboxContainer.querySelector(".error_message")
          const checkedInput = inputs.find((checkbox) => {
            return checkbox.checked
          })
          if (checkedInput != null) {
            checkboxContainer.classList.add("ok")
            checkboxContainer.classList.remove("error")
            inputInfo.error = "none"
            return
          }
          checkboxContainer.classList.add("error")
          checkboxContainer.classList.remove("ok")
          inputInfo.error = "Please check at least one option"
          errorDisplayer.textContent = inputInfo.error
        })
      })
    }
  }
}

function checkTextInputValidation(inputInfo) {
  const input = form.querySelector(`input[name='${inputInfo.name}']`)
  const input_parent = input.parentElement
  const errorDisplayer = input_parent.querySelector(".error_message")
  if (inputInfo.validation === "email") {
    const validEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    input.addEventListener("keyup", () => {
      const email = input.value
      if (validEmail.test(email)) {
        inputInfo.error = validationRespone(input, "ok")
        return
      } else if (input.value === "" && inputInfo.require) {
        inputInfo.error = validationRespone(
          input,
          "error",
          "Please fill out this field."
        )
        return
      } else if (input.value === "" && inputInfo.require === false) {
        input_parent.classList.remove("ok")
        input_parent.classList.remove("error")
        inputInfo.error = "none"
        return
      }
      inputInfo.error = validationRespone(input, "error", "Invalid Email")
    })
  } else if (inputInfo.validation === "normalText") {
    input.addEventListener("keyup", () => {
      if (inputInfo.require && input.value !== "") {
        inputInfo.error = validationRespone(input, "ok")
        return
      } else if (inputInfo.require && input.value === "") {
        inputInfo.error = validationRespone(
          input,
          "error",
          "Please fill out this field."
        )
        return
      }
    })
  }
}
function validationRespone(inputElement, validationResult, errorMessage) {
  if (validationResult === "ok") {
    inputElement.parentElement.classList.add("ok")
    inputElement.parentElement.classList.remove("error")
    return "none"
  }
  inputElement.parentElement.classList.add("error")
  inputElement.parentElement.classList.remove("ok")
  inputElement.parentElement.querySelector(".error_message").textContent =
    errorMessage
  return errorMessage
}

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const errorInput = allFormInputInfo.find((inputInfo) => {
    return inputInfo.error !== "none"
  })
  if (errorInput != null) {
    if (errorInput.type === "radio" || errorInput.type === "checkbox") {
      const input = document.querySelector(`[name=${errorInput.name}`)
      const inputContainer = input.closest(".radio_input_container")
      window.scrollTo(inputContainer)
      inputContainer.classList.add("error")
      inputContainer.querySelector(".error_message").textContent =
        errorInput.error
      return
    }
    const input = document.querySelector(`[name=${errorInput.name}`)
    input.focus()
    const inputParent = input.parentElement
    const errorDisplayer = inputParent.querySelector(".error_message")
    errorDisplayer.textContent = errorInput.error
    inputParent.classList.add("error")
    return
  }
  // get input data
  const formData = []
  allFormInputInfo.forEach((inputInfo) => {
    if (inputInfo.type === "text" || inputInfo.type === "select") {
      const data = form.querySelector(`[name="${inputInfo.name}"]`)
      console.log(data.value)
      return
    }
    let data = Array.from(
      form.querySelectorAll(`input[name="${inputInfo.name}"]`)
    )
      .filter((input) => {
        return input.checked
      })
      .map((input) => {
        return input.value
      })
      .reduce((finalData, data) => {
        return `${finalData}, ${data}`
      })
    console.log(data)
  })
})

// // test code
// const check = /abc/.test("defgkd kdksabc")
// console.log(check)

const validation = document.querySelector("#id")
validation.addEventListener("invalid", () => {
  validation.setCustomValidity("hey")
})
validation.addEventListener("change", () => {
  validation.setCustomValidity("")
})
