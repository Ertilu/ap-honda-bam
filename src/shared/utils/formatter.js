export const formatRupiah = (angka, prefix = '') => {
  var number_string = angka
      .toString()
      .replace(/[^,\d]/g, '')
      .toString(),
    split = number_string.split(','),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi)

  if (ribuan) {
    let separator = sisa ? '.' : ''
    rupiah += separator + ribuan.join('.')
  }

  rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah
  return prefix === undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : ''
}

export function toLocalISOString(date) {
  const localDate = new Date(date - date.getTimezoneOffset() * 60000) //offset in milliseconds. Credit https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset

  // Optionally remove second/millisecond if needed
  localDate.setSeconds(null)
  localDate.setMilliseconds(null)
  return localDate.toISOString().slice(0, -1)
}
