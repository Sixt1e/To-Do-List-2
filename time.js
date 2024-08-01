function removeZeros(value) {
  if (value < 10) {
    value = "0" + value;
  }
  return value;
}

function dateTime() {
  let currentDatetime = new Date();
  let day = removeZeros(currentDatetime.getDate());
  let hours = removeZeros(currentDatetime.getHours());
  let minutes = removeZeros(currentDatetime.getMinutes());
  let seconds = removeZeros(currentDatetime.getSeconds());
  let month = removeZeros(currentDatetime.getMonth() + 1);
  return day + "." + month + "." + " " + hours + ":" + minutes + ":" + seconds;
}

document.getElementById("time").innerHTML = dateTime();

setInterval(function () {
  document.getElementById("time").innerHTML = dateTime();
}, 1000);
