const conversionForm = document.getElementById('conversionForm');
const amountInput = document.getElementById('amount');
const currencySelect = document.getElementById('currency');
const resultElement = document.getElementById('result');
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Tasas de Cambio',
      data: [],
      borderColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 1,
    }],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

conversionForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const amount = parseFloat(amountInput.value);
  const currency = currencySelect.value;
  try {
    const response = await fetch('https://mindicador.cl/api/');
    const data = await response.json();
    const rate = data.rates[currency];
    if (!rate) {
      throw new Error(`No se encontró la moneda ${currency}`);
    }
    const result = amount * rate;
    resultElement.textContent = `Resultado: ${result.toFixed(2)} ${currency}`;
    chart.data.labels.push(currency);
    chart.data.datasets[0].data.push(rate);
    chart.update();
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
  }
});