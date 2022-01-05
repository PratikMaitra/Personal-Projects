# Ridge
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import TimeSeriesSplit
from sklearn.preprocessing import MinMaxScaler
from sklearn.linear_model import Ridge

df = pd.read_csv("MSFT.csv", na_values = ['null'], index_col = 'Date', parse_dates = True, infer_datetime_format = True)
output_var = pd.DataFrame(df['Adj Close'])
features = ['Open', 'High', 'Low', 'Volume']

scaler = MinMaxScaler()
feature_transform = scaler.fit_transform(df[features])
feature_transform= pd.DataFrame(columns=features, data=feature_transform, index=df.index)
feature_transform.head()

timesplit = TimeSeriesSplit(n_splits=10)
for train_index, test_index in timesplit.split(feature_transform):
        X_train, X_test = feature_transform[:len(train_index)], feature_transform[len(train_index): (len(train_index)+len(test_index))]
        y_train, y_test = output_var[:len(train_index)].values.ravel(), output_var[len(train_index): (len(train_index)+len(test_index))].values.ravel()


#Creating the Regressor
regressor = Ridge()


regressor.fit(X_train,y_train)

y_pred= regressor.predict(X_test)

fig, ax = plt.subplots(figsize=(16,8))
ax.set_facecolor('#c7c7c7')
plt.plot(y_test, color='blue', label='Actual Price')
plt.plot(y_pred, color='red', label='Predicted Price')
plt.title("Microsoft")
plt.xlabel('Time Scale')
plt.ylabel('USD')
plt.legend()
plt.show()