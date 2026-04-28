// Global variables
let scatterChart = null;
let trendChart = null;

// Page initialization
document.addEventListener('DOMContentLoaded', () => {
    loadModelStatistics();
    createCharts();
    setupFormListener();
});

// Setup form listener
function setupFormListener() {
    const form = document.getElementById('predictionForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const area = document.getElementById('areaInput').value;
        
        if (!area || area <= 0) {
            showError('Please enter a valid area value');
            return;
        }

        await makePrediction(parseFloat(area));
    });
}

// Make prediction
async function makePrediction(area) {
    try {
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ area: area })
        });

        if (!response.ok) {
            const error = await response.json();
            showError(error.error || 'An error occurred');
            return;
        }

        const data = await response.json();
        displayResult(data);
        hideError();
    } catch (error) {
        showError('Failed to get prediction: ' + error.message);
    }
}

// Display result
function displayResult(data) {
    const resultCard = document.getElementById('resultCard');
    
    document.getElementById('resultArea').textContent = `${data.area} sq ft`;
    document.getElementById('resultPrice').textContent = `₹ ${data.predicted_price.toLocaleString('en-IN', {maximumFractionDigits: 2})}`;
    document.getElementById('resultPriceSqFt').textContent = `₹ ${data.price_per_sqft.toLocaleString('en-IN', {maximumFractionDigits: 2})}`;
    
    resultCard.classList.remove('hidden');
}

// Show error
function showError(message) {
    const errorCard = document.getElementById('errorCard');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = '❌ ' + message;
    errorCard.classList.remove('hidden');
}

// Hide error
function hideError() {
    const errorCard = document.getElementById('errorCard');
    errorCard.classList.add('hidden');
}

// Load model statistics
async function loadModelStatistics() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();

        document.getElementById('trainScore').textContent = 
            (data.train_score * 100).toFixed(2) + '%';
        document.getElementById('testScore').textContent = 
            (data.test_score * 100).toFixed(2) + '%';
        document.getElementById('coefficient').textContent = 
            '₹ ' + data.model_coefficient.toFixed(2) + '/sqft';
        document.getElementById('intercept').textContent = 
            '₹ ' + data.model_intercept.toLocaleString('en-IN', {maximumFractionDigits: 2});
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

// Create charts
async function createCharts() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();

        createScatterChart(data);
        createTrendChart(data);
    } catch (error) {
        console.error('Error creating charts:', error);
    }
}

// Create scatter chart
function createScatterChart(data) {
    const ctx = document.getElementById('scatterChart').getContext('2d');
    
    scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Training Data',
                data: data.areas.map((area, index) => ({
                    x: area,
                    y: data.prices[index]
                })),
                backgroundColor: 'rgba(37, 99, 235, 0.6)',
                borderColor: 'rgba(30, 64, 175, 0.8)',
                borderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBorderColor: 'rgba(30, 64, 175, 1)',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'House Area vs Price Distribution',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Area (sq ft)',
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 1000,
                    max: 4500
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price (₹)',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}

// Create trend line chart
function createTrendChart(data) {
    const ctx = document.getElementById('trendChart').getContext('2d');
    
    // Generate trend line data
    const minArea = Math.min(...data.areas);
    const maxArea = Math.max(...data.areas);
    const trendAreas = [];
    const trendPrices = [];
    
    for (let i = minArea; i <= maxArea; i += 100) {
        trendAreas.push(i);
        trendPrices.push(data.model_intercept + (data.model_coefficient * i));
    }

    trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: trendAreas,
            datasets: [
                {
                    label: 'Regression Line (Prediction Model)',
                    data: trendPrices,
                    borderColor: 'rgba(16, 185, 129, 1)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 0
                },
                {
                    label: 'Actual Data Points',
                    data: data.areas.map((area, index) => data.prices[index]),
                    type: 'scatter',
                    backgroundColor: 'rgba(37, 99, 235, 0.6)',
                    borderColor: 'rgba(30, 64, 175, 1)',
                    borderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Price Prediction Trend Line',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Area (sq ft)',
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price (₹)',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}
