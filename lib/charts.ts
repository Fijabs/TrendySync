// Use Chart.js from the global window object

export function initCharts() {
  // Wait for Chart.js to be loaded
  if (typeof window !== "undefined" && (window as any).Chart) {
    const trendChart = initTrendChart()
    const ageChart = initAgeChart()
    const genderChart = initGenderChart()

    return { trendChart, ageChart, genderChart }
  }

  return { trendChart: null, ageChart: null, genderChart: null }
}

function initTrendChart() {
  const trendCtx = document.getElementById("trendChart") as HTMLCanvasElement
  if (!trendCtx) return null

  return new (window as any).Chart(trendCtx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Twitter",
          data: [120, 190, 250, 320, 400, 380, 350],
          borderColor: "#1DA1F2",
          backgroundColor: "rgba(29, 161, 242, 0.1)",
          tension: 0.3,
          fill: true,
        },
        {
          label: "TikTok",
          data: [80, 100, 150, 220, 300, 350, 400],
          borderColor: "#000000",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          tension: 0.3,
          fill: true,
        },
        {
          label: "Instagram",
          data: [90, 120, 180, 250, 320, 340, 380],
          borderColor: "#E1306C",
          backgroundColor: "rgba(225, 48, 108, 0.1)",
          tension: 0.3,
          fill: true,
        },
        {
          label: "YouTube",
          data: [60, 80, 120, 180, 250, 300, 350],
          borderColor: "#FF0000",
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  })
}

function initAgeChart() {
  const ageCtx = document.getElementById("ageChart") as HTMLCanvasElement
  if (!ageCtx) return null

  return new (window as any).Chart(ageCtx, {
    type: "bar",
    data: {
      labels: ["18-24", "25-34", "35-44", "45+"],
      datasets: [
        {
          data: [35, 45, 15, 5],
          backgroundColor: [
            "rgba(54, 162, 235, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(255, 159, 64, 0.7)",
            "rgba(153, 102, 255, 0.7)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          display: false,
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  })
}

function initGenderChart() {
  const genderCtx = document.getElementById("genderChart") as HTMLCanvasElement
  if (!genderCtx) return null

  return new (window as any).Chart(genderCtx, {
    type: "doughnut",
    data: {
      labels: ["Female", "Male", "Other"],
      datasets: [
        {
          data: [60, 35, 5],
          backgroundColor: ["rgba(255, 99, 132, 0.7)", "rgba(54, 162, 235, 0.7)", "rgba(255, 206, 86, 0.7)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
      cutout: "70%",
    },
  })
}

export function updateTrendData(trendChart: any) {
  if (!trendChart) return

  // Get current data
  const twitterData = trendChart.data.datasets[0].data
  const tiktokData = trendChart.data.datasets[1].data
  const instagramData = trendChart.data.datasets[2].data
  const youtubeData = trendChart.data.datasets[3].data

  // Remove first data point
  twitterData.shift()
  tiktokData.shift()
  instagramData.shift()
  youtubeData.shift()

  // Add new data point with some variation
  twitterData.push(Math.max(0, twitterData[twitterData.length - 1] + (Math.random() - 0.3) * 50))
  tiktokData.push(Math.max(0, tiktokData[tiktokData.length - 1] + (Math.random() - 0.2) * 60))
  instagramData.push(Math.max(0, instagramData[instagramData.length - 1] + (Math.random() - 0.4) * 40))
  youtubeData.push(Math.max(0, youtubeData[youtubeData.length - 1] + (Math.random() - 0.3) * 45))

  // Update chart
  trendChart.update()

  // Schedule next update
  setTimeout(() => updateTrendData(trendChart), 5000)
}
