import pickle;
import pandas as pd

with open("stock_classifier.pkl", "rb") as file:
    classifier = pickle.load(file)

new_stock = pd.read_csv("new_stock_data.csv")
new_features = ['open', 'close', 'volume']
new_X = new_stock[new_features]

# Standardize the features
new_X = scaler.transform(new_X)

# Predict the class of the new stock data
new_y_pred = classifier.predict(new_X)