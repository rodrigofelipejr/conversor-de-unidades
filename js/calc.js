$(function () {
  const btnConvert = '#btnConvert'
  const editMilhas = '#editMilhas'

  //only numbers
  $(editMilhas).keyup(() => {
    $(editMilhas).val($(editMilhas).val().replace(/[^0-9]/g, ''))
  })

  $('#btnConvert').click(() => {
    const milhas = parseFloat($(editMilhas).val())

    if (isNaN(milhas)) {
      $(editMilhas).focus()
      $(editMilhas).next().addClass('form-text error')
      return 
    } 

    const metros = milhas * 1609.34
    $('#editMetros').val((metros.toFixed(2).toString().replace('.', ',')))
    console.log('end click');
  })
})