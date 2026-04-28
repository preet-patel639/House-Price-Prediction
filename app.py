from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
import json

app = Flask(__name__)

# Simple Linear Regression Implementation
class LinearRegressionModel:
    def __init__(self):
        self.coef_ = None
        self.intercept_ = None
        
    def fit(self, X, y):
        """Fit linear regression model using normal equation"""
        X_array = np.array(X).reshape(-1, 1) if isinstance(X, (list, pd.Series)) else np.array(X)
        y_array = np.array(y).reshape(-1)
        
        # Add intercept term
        X_with_intercept = np.column_stack([np.ones(len(X_array)), X_array])
        
        # Normal equation: theta = (X'X)^-1 X'y
        theta = np.linalg.lstsq(X_with_intercept, y_array, rcond=None)[0]
        
        self.intercept_ = theta[0]
        self.coef_ = theta[1:]
        return self
        
    def predict(self, X):
        """Make predictions"""
        X_array = np.array(X).reshape(-1, 1) if isinstance(X, (list, pd.Series)) else np.array(X)
        return self.intercept_ + np.dot(X_array, self.coef_)
        
    def score(self, X, y):
        """Calculate R² score"""
        y_pred = self.predict(X)
        y_array = np.array(y).reshape(-1)
        
        ss_res = np.sum((y_array - y_pred) ** 2)
        ss_tot = np.sum((y_array - np.mean(y_array)) ** 2)
        
        return 1 - (ss_res / ss_tot)

# Load and train the model
data = pd.read_csv('house_prices.csv')
X = data[['Area']]
y = data['Price']

# Manual train-test split
np.random.seed(1)
indices = np.random.permutation(len(data))
train_size = int(0.8 * len(data))

X_train = data.iloc[indices[:train_size]][['Area']]
y_train = data.iloc[indices[:train_size]]['Price']
X_test = data.iloc[indices[train_size:]][['Area']]
y_test = data.iloc[indices[train_size:]]['Price']

model = LinearRegressionModel()
model.fit(X_train, y_train)

# Calculate model performance
train_score = model.score(X_train, y_train)
test_score = model.score(X_test, y_test)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        area = float(request.json.get('area'))
        
        if area <= 0:
            return jsonify({'error': 'Area must be greater than 0'}), 400
        
        predicted_price = model.predict([[area]])[0]
        
        # Calculate price per sq ft
        price_per_sqft = predicted_price / area
        
        return jsonify({
            'area': area,
            'predicted_price': round(predicted_price, 2),
            'price_per_sqft': round(price_per_sqft, 2),
            'success': True
        })
    except ValueError:
        return jsonify({'error': 'Invalid input'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/data', methods=['GET'])
def get_data():
    """Return training data for visualization"""
    data_dict = {
        'areas': data['Area'].tolist(),
        'prices': data['Price'].tolist(),
        'model_coefficient': float(model.coef_[0]),
        'model_intercept': float(model.intercept_),
        'train_score': float(train_score),
        'test_score': float(test_score)
    }
    return jsonify(data_dict)

if __name__ == '__main__':
    print("🏠 House Price Prediction Website Running...")
    print("📍 Navigate to: http://localhost:5000")
    app.run(debug=True, port=5000)
