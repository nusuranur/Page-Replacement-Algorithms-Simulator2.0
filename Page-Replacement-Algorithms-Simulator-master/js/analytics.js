fetch("php/get_analytics.php")
  .then(res => res.json())
  .then(data => {
      // Render bar chart of most-used algorithms
      const ctx = document.getElementById('algoChart').getContext('2d');
      new Chart(ctx, {
          type: 'bar',
          data: {
              labels: data.algorithms,
              datasets: [{
                  label: 'Usage Count',
                  data: data.usage,
                  backgroundColor: 'rgba(0, 230, 255, 0.5)',
                  borderColor: '#00e6ff',
                  borderWidth: 2
              }]
          }
      });
  });
