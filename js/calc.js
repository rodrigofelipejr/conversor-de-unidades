$(function () {
  const btn_convert = '#btnConvert'
  const edit_milhas = '#editMilhas'
  const edit_metros = '#editMetros'

  //only numbers
  $(edit_milhas).keyup(() => {
    $(edit_milhas).val($(edit_milhas).val().replace(/[^0-9]/g, ''))

    if ($(edit_milhas).val().length > 0) {
      $(edit_milhas).next().removeClass('error')
    }
  })

  //click button
  $(btn_convert).click(() => {
    const milhas = parseFloat($(edit_milhas).val())

    //validation
    if (isNaN(milhas)) {
      $(edit_milhas).focus()
      $(edit_milhas).next().addClass('error')
      $(edit_metros).val('')
      return
    }

    //calc
    const metros = milhas * 1609.34
    $(edit_metros).val((metros.toFixed(2).toString().replace('.', ',')))
  })
})