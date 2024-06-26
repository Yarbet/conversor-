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
    const url = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=CLP&to=${currency}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3d6ce1dc4dmsheff8f4ab64cf10cp104759jsnfc9fc7288273',
        'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
      }
    };

    const response = await fetch(url, options);
    const data = await response.json();
    const rate = data?.rates?.CLP;

    if (!rate) {
      throw new Error(`No se encontró la moneda ${currency}`);
    }
    const result = parseFloat(amount / rate).toFixed(2);
    resultElement.textContent = `Resultado: ${result} ${currency}`;
    chart.data.labels.push(currency);
    chart.data.datasets[0].data.push(rate);
    chart.update();
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
  }
});