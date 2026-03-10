import pandas as pd
import json
from datetime import datetime

def load_crime_data():
    """
    Load crime data from CSV or API
    TODO: Replace with actual data source (NCRB, Kaggle, etc.)
    """
    
    # Sample data structure
    data = {
        'state': ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh'],
        'year': [2022, 2022, 2022, 2022, 2022],
        'homicide': [1245, 892, 654, 521, 1456],
        'theft': [5234, 3456, 2891, 2145, 4567],
        'rape': [456, 234, 189, 145, 678],
        'cybercrime': [234, 567, 345, 289, 412],
        'human_trafficking': [56, 34, 28, 21, 67],
        'population': [125000000, 32000000, 68000000, 72000000, 230000000]
    }
    
    df = pd.DataFrame(data)
    return df

def clean_data(df):
    """Clean and normalize data"""
    # Fill missing values
    df.fillna(0, inplace=True)
    
    # Convert to proper types
    df['population'] = df['population'].astype(int)
    df['year'] = df['year'].astype(int)
    
    return df

def calculate_rates(df):
    """Calculate crime rates per 100,000 population"""
    crime_columns = ['homicide', 'theft', 'rape', 'cybercrime', 'human_trafficking']
    
    for col in crime_columns:
        df[f'{col}_rate'] = (df[col] / df['population'] * 100000).round(2)
    
    return df

def save_to_json(df, filename='seedData.json'):
    """Save processed data to JSON"""
    data = df.to_dict(orient='records')
    
    with open(filename, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"Data saved to {filename}")

if __name__ == "__main__":
    print("Loading crime data...")
    df = load_crime_data()
    
    print("Cleaning data...")
    df = clean_data(df)
    
    print("Calculating rates...")
    df = calculate_rates(df)
    
    print("Saving to JSON...")
    save_to_json(df)
    
    print("Done! ✅")