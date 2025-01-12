// Dark Mode Toggle
const toggleBtn = document.querySelector('.theme-toggle');

// Real-Time Chart
const ctx = document.getElementById('energyChart').getContext('2d');
const energyChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],  // Pre-existing months
    datasets: [{
      label: 'Energy Consumption (kWh)',
      data: [150, 170, 160, 180],  // Pre-existing data for energy consumption
      borderColor: '#a32e65',
      borderWidth: 2,
      fill: false,
    }],
  },
  options: {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Time' } },
      y: { title: { display: true, text: 'Energy (kWh)' }, beginAtZero: true },
    },
  },
});

// Update Chart
function updateChart(usage) {
  const now = new Date().toLocaleTimeString();
  energyChart.data.labels.push(now);
  energyChart.data.datasets[0].data.push(usage);

  if (energyChart.data.labels.length > 10) {
    energyChart.data.labels.shift();
    energyChart.data.datasets[0].data.shift();
  }

  energyChart.update();
}

// Savings Calculator
const savingsForm = document.getElementById('savingsForm');
savingsForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const usage = parseFloat(document.getElementById('usage').value);
  const rate = parseFloat(document.getElementById('rate').value);

  if (isNaN(usage) || isNaN(rate)) {
    alert('Please enter valid numbers!');
    return;
  }

  const savings = usage * rate * 0.2; // Example: 20% savings
  document.getElementById('result').textContent = 
    `You can save approximately $${savings.toFixed(2)} per year!`;

  // Update Chart and Recommendations
  updateChart(usage);
  document.getElementById('recommendationText').textContent =
    usage > 200 ? "Consider reducing high-energy appliances!" : "You're on track!";
  document.getElementById('carbonResult').textContent =
    `Your estimated carbon footprint is ${(usage * 0.92).toFixed(2)} kg CO2e per month.`;
});
