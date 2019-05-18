$(function () {
  // initializing
  main();

  // button change
  fnChangeElements()

  // format form
  fnRebuildingForm()
})

const main = () => {
  let edit_first_Id = document.querySelector('form .form-group:nth-of-type(1) input[type="text"]').id
  let edit_first = '#editMilhas'
  let edit_second = '#editMetros'

  if (edit_first_Id === 'editMetros') {
    edit_first = '#editMetros'
    edit_second = '#editMilhas'
  }

  // enter only numbers
  $(edit_first).keyup(() => {
    $(edit_first).val($(edit_first).val().replace(/[^0-9]/g, ''))

    if ($(edit_first).val().length > 0) {
      $(edit_first).next().removeClass('error')
    }
  })

  // clean the second input on the output of the first
  $(edit_first).blur(() => {
    if ($(edit_first).val().length === 0) {
      $(edit_second).val('')
    }
  })

  // conversion 
  $('#btnConvert').click(() => {
    const inputValue = parseFloat($(edit_first).val())

    console.log(`edit_first ${edit_first}`);
    console.log(`inputValue ${inputValue}`);

    // validation for null value
    if (isNaN(inputValue)) {
      $(edit_first).focus()
      $(edit_first).next().addClass('error')
      $(edit_second).val('')

      const date = new Date()
      console.log(date.getMilliseconds());

      // hide validation
      setTimeout(() => {
        $(edit_first).next().removeClass('error')
      }, 3000)

      return
    }

    // conversion calculates 
    let toFixed = (edit_first_Id === 'editMilhas') ? 2 : 5 
    let resultValue = (edit_first_Id === 'editMilhas') ? inputValue * 1609.34 : inputValue / 1609.34

    // setting the result
    $(edit_second).val((resultValue.toFixed(toFixed).toString().replace('.', ',')))
  })
}

const fnChangeElements = () => {
  $(document).on('click', '.btn.btnChange', () => {
    // getting form
    elementForm = document.querySelector('form')

    // getting elements
    const firstSelector = 'form .form-group:nth-of-type(1)'
    const firstElement = document.querySelector(firstSelector)
    const firstElementHTML = document.querySelector(firstSelector).cloneNode(true)

    // getting elements
    const secondSelector = 'form .form-group:nth-of-type(2)'
    const secondElement = document.querySelector(secondSelector)
    const secondElementHTML = document.querySelector(secondSelector).cloneNode(true)

    // removing elements
    firstElement.remove()
    secondElement.remove()

    // add new elements
    elementForm.insertBefore(secondElementHTML, document.querySelector(firstSelector) || null)
    elementForm.insertBefore(firstElementHTML, document.querySelector(secondSelector) || null)

    // hide validation
    const elementValidation = document.querySelectorAll('small.error')
    if (elementValidation[0]) {
      elementValidation[0].classList.remove('error')
    }

    // clear event handler
    $("#btnConvert").unbind("click");

    // rearranging form
    fnRebuildingForm()
    main()
  })
}

const fnRebuildingForm = () => {
  // creating selectors
  const firstElement = 'form .form-group:nth-of-type(1) input[type="text"]'
  const secondElement = 'form .form-group:nth-of-type(2) input[type="text"]'

  // enabling and disabling elements
  document.querySelector(firstElement).removeAttribute('readonly')
  document.querySelector(firstElement).value = ''

  document.querySelector(secondElement).setAttribute('readonly', '')
  document.querySelector(secondElement).value = ''
}