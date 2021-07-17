const form = document.querySelector("form")

const allFormInputInfo = [
  {
    name: "name_title",
    type: ["text", "notEmpty"]
  },
  {
    name: "first_name",
    type: ["text", "notEmpty"]
  },
  {
    name: "last_name",
    type: ["text", "notEmpty"]
  }
]

allFormInputInfo.forEach((inputInfo) => {
  checkValidation(inputInfo)
})

function checkValidation(inputInfo) {
  const inputType = inputInfo.type[0]
  if (inputType === "text") {
    const validationType = inputInfo.type[1]
    checkTextInputValidation(inputInfo.name, validationType)
  }
}

function checkTextInputValidation(inputName, validationType) {
  const input = form.querySelector(`input[name='${inputName}']`)
  if (validationType === "notEmpty") {
    input.addEventListener("keyup", (e) => {
      const input_parent = input.parentElement
      if (input.value.trim() === "") {
        input_parent.classList.add("error")
        input_parent.classList.remove("ok")
        input_parent.querySelector(".error_message").textContent =
          "Please fill out this field."
      } else {
        input_parent.classList.add("ok")
        input_parent.classList.remove("error")
      }
    })
  }
}
