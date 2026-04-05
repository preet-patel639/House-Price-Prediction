# Step 1: Import libraries

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# Step 2: Load Data
data = pd.read_csv('house_prices.csv')
print("🔹Sample Data:")
print(data.head())

# Step 3: Visualize data
plt.scatter(data['Area'], data['Price'], color='green')
plt.title("House Area vs Price")
plt.xlabel("Area (sq ft)")
plt.ylabel("Price (₹)")
plt.show()

# Step 4: Feature & Target
X = data[['Area']]  # input
y = data['Price']   # output

# Step 5: Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X,y, test_size=0.2, random_state=1)

# Step 6: Train Model
model = LinearRegression()
model.fit(X_train, y_train)

# Step 7: Prediction from user input
area_input = float(input(" 🏠  Enter the House Area (in sq ft): "))
predicted_price = model.predict([[area_input]])

print(f"\n Prediction: A house with {area_input} aq ft area may cost approximately ₹ {predicted_price[0]:,.2f}")







