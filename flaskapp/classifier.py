import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import pickle;

# Load the stock data
df = pd.read_csv('C:\\Users\\priya.000\\Downloads\\monthly_adjusted_IBM(1).csv')

# Calculate the volatility of each stock
df['volatility'] = df['high'] - df['low']

# Define a threshold to classify stocks as high or low volatility
threshold = df['volatility'].mean()
df['volatility_class'] = np.where(df['volatility'] >= threshold, 'high', 'low')

# Extract relevant features from the stock data
features = ['open', 'close']
X = df[features]

# Scale the features to standardize the data
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Split the data into training and testing datasets
y = df['volatility_class']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

# Train a Random Forest classifier
classifier = RandomForestClassifier(n_estimators=275, random_state=0)
classifier.fit(X_train, y_train)


with open("stock_classifier.pkl", "wb") as file:
    pickle.dump(classifier, file)


# Predict the class of the stocks in the test data
y_pred = classifier.predict(X_test)

# Evaluate the accuracy of the model
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)
