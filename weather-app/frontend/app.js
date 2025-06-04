const form = document.getElementById("weather-form");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = document.getElementById("city").value.trim();

  resultDiv.textContent = "Loading...";

  try {
    const res = await fetch(`http://localhost:3000/weather?city=${city}`);
    const data = await res.json();

    if (data.error) {
      resultDiv.textContent = data.error;
    } else {
      resultDiv.innerHTML = `
        <strong>${data.city}</strong><br/>
        Temperature: ${data.temperature}<br/>
        Condition: ${data.condition}
      `;
    }
  } catch (err) {
    resultDiv.textContent = "Error: Could not fetch weather.";
  }
});
