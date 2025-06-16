// 模拟传感器数据更新
function updateSensorData() {
  document.querySelectorAll(".sensor-value").forEach((el) => {
    const currentValue = parseFloat(el.textContent);
    const change = (Math.random() - 0.5) * currentValue * 0.05;
    const newValue = Math.max(0, currentValue + change).toFixed(1);

    // 保留一位小数，但如果是整数则不显示小数部分
    if (newValue.endsWith(".0")) {
      el.textContent = newValue.split(".")[0];
    } else {
      el.textContent = newValue;
    }
  });
}

setInterval(updateSensorData, 3000);

// 初始化传感器历史图表
function initSensorCharts() {
  const charts = [
    { id: "methaneChart", color: "#4facfe", label: "甲烷浓度 (%LEL)" },
    { id: "coChart", color: "#ff9a76", label: "一氧化碳 (ppm)" },
    { id: "smokeChart", color: "#e74c3c", label: "烟雾浓度 (%obs/m)" },
    { id: "dustChart", color: "#9b59b6", label: "粉尘浓度 (mg/m³)" },
    { id: "thermalChart", color: "#ff3300", label: "温度 (°C)" },
    { id: "oxygenChart", color: "#2ecc71", label: "氧气浓度 (%)" },
  ];

  charts.forEach((chart) => {
    const ctx = document.getElementById(chart.id).getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from({ length: 10 }, (_, i) => i + 1),
        datasets: [
          {
            label: chart.label,
            data: Array.from({ length: 10 }, () => Math.random() * 100),
            borderColor: chart.color,
            backgroundColor: `${chart.color}20`,
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        scales: {
          x: {
            display: false,
            grid: { display: false },
          },
          y: {
            display: false,
            grid: { display: false },
            min: 0,
            max: 100,
          },
        },
      },
    });
  });
}

// 初始化页面
window.addEventListener("load", () => {
  initSensorCharts();

  // 添加面板加载动画
  document.querySelectorAll(".sensor-card").forEach((panel, index) => {
    setTimeout(() => {
      panel.style.opacity = "1";
      panel.style.transform = "translateY(0)";
    }, 100 * index);

    // 初始状态
    panel.style.opacity = "0";
    panel.style.transform = "translateY(20px)";
    panel.style.transition = "opacity 0.5s, transform 0.5s";
  });
});
