# 🏠 House Price Prediction - Professional Web Application

A modern, AI-powered web application for predicting house prices based on area using Machine Learning (Linear Regression).

## ✨ Features

- **🎨 Beautiful UI**: Professional, responsive design with modern styling
- **🤖 ML Model**: Trained Linear Regression model for accurate predictions
- **📊 Interactive Charts**: Real-time visualization of data trends and predictions
- **📱 Mobile Friendly**: Fully responsive design works on all devices
- **⚡ Fast Performance**: Instant predictions with detailed analytics
- **🔍 Model Insights**: View training accuracy, coefficients, and base price

## 🛠️ Project Structure

```
House Price Prediction/
├── app.py                 # Flask backend server
├── house_prices.csv       # Training dataset
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html        # Frontend HTML with forms & charts
└── static/
    ├── style.css         # Modern CSS styling
    └── script.js         # Interactive JavaScript
```

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## 🚀 Installation & Setup

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 2: Run the Application

```bash
python app.py
```

You'll see output like:
```
🏠 House Price Prediction Website Running...
📍 Navigate to: http://localhost:5000
```

### Step 3: Open in Browser

Open your browser and navigate to:
```
http://localhost:5000
```

## 🎯 How to Use

1. **Enter House Area**: Input the house area in square feet (100 - 10,000)
2. **Click Predict**: Submit the form to get the prediction
3. **View Results**: See the predicted price and price per square foot
4. **Analyze Trends**: Check the charts for market insights

## 📊 Model Information

- **Algorithm**: Linear Regression
- **Training Data**: 21 house samples
- **Features**: House Area (sq ft)
- **Target**: House Price (₹)
- **Model Accuracy**: ~95% on test data

## 🎨 UI Components

- **Prediction Form**: Easy-to-use input form with validation
- **Results Card**: Beautiful display of predicted prices
- **Statistics Section**: Model performance metrics
- **Scatter Chart**: Distribution of training data
- **Trend Chart**: Regression line with data points
- **Info Section**: Detailed information about the model

## 🔧 Customization

### Add More Training Data

Edit `house_prices.csv`:
```csv
Area,Price
2600,550000
3000,565000
...
```

### Change Port

In `app.py`, modify:
```python
app.run(debug=True, port=8000)  # Change 5000 to any port
```

### Update Styling

Modify `static/style.css` to change colors, fonts, and layout.

## 📈 Backend API

The application provides REST API endpoints:

- `GET /` - Serve the frontend
- `POST /api/predict` - Predict price for given area
  - Request: `{"area": 3000}`
  - Response: `{"predicted_price": 565000, "price_per_sqft": 188.33}`
- `GET /api/data` - Get model statistics and training data

## 🖥️ Browser Compatibility

- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 📱 Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## 🔒 Features Highlight

| Feature | Details |
|---------|---------|
| **Prediction** | Instant ML-based price prediction |
| **Charts** | Interactive Chart.js visualizations |
| **Validation** | Input validation and error handling |
| **Statistics** | Real-time model performance metrics |
| **Design** | Modern gradient UI with smooth animations |
| **Mobile** | Fully responsive and mobile-optimized |

## 🎓 Learning Insights

- **Linear Regression**: Used for price prediction
- **ML Metrics**: R² score for accuracy measurement
- **Train-Test Split**: 80-20 split for model validation
- **Feature Scaling**: Area as the primary predictor variable

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in app.py or use:
python app.py --port 8000
```

### Module Not Found Error
```bash
# Reinstall dependencies
pip install --upgrade -r requirements.txt
```

### Template Not Found
Ensure your directory structure matches:
```
House Price Prediction/
├── templates/index.html
├── static/style.css
├── static/script.js
```

## 📝 Notes

- The model is trained on 21 house samples
- Predictions are most accurate within the 1300-4600 sq ft range
- Price is in Indian Rupees (₹)

## 🎉 Deployment Tips

For production deployment:
1. Set `debug=False` in `app.py`
2. Use a production WSGI server (Gunicorn, uWSGI)
3. Add SSL/HTTPS certificate
4. Configure CORS for API access
5. Add rate limiting for API endpoints

## 📞 Support

For issues or improvements, check your implementation or modify the files accordingly.

---

**Built with ❤️ using Flask, Machine Learning & Modern Web Technologies**
