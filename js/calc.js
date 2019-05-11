$(function () {
  $('#btnConvert').click(() => {
    const milhas = parseFloat($('#editMilhas').val())
    const metros = milhas * 1609.34
    $('#editMetros').val((metros.toFixed(2).toString().replace('.', ',')))
  })
})