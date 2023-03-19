document.getElementById('timeinput').addEventListener('input', (event) => {
  const hour = parseInt(event.target.value);
  // update the map
 

  // converting 0-23 hour to AMPM format
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 ? hour % 12 : 12;

  // update text in the UI
  document.getElementById('active-hour').innerText = hour12 + ampm;
});