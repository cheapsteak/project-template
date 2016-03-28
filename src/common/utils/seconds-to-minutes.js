// Example:
// -1 ==> Don't do that
// 0  ==> '00:00'
// 30 ==> '00:30'
// 70 ==> '01:10'

export default function secondsToMinutes (totalSeconds) {
  const totalSecondsFloat = parseFloat(totalSeconds);
  let minutes = Math.floor(totalSecondsFloat / 60);
  let seconds = Math.round(totalSecondsFloat - (minutes * 60));

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  const time = minutes + ':' + seconds;

  return time;
}