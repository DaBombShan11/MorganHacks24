import sqlite3
from pymongo import MongoClient
from datetime import datetime
import time
from pymongo.errors import ConnectionFailure


def read_glucose_monitor(database_file):


    sqliteConnection = sqlite3.connect(database_file, url) #Connects to database
    cursor = sqliteConnection.cursor()
    
    row = 1
    while (True):
        query = 'SELECT readings FROM database WHERE row_id = {}'.format(row) #SQL query that selects reading based on row.
        cursor.execute(query)
        result = cursor.fetchone() #
        reading = result[0] #Takes data out of tuple and inserts it into the variable reading.


        
        glucose_reading = GlucoseReading(reading, row)


        
        write_glucose_data(url, glucose_reading) #Function call to write data to centralized database hosted in cloud.
        time.sleep(60) #wait a 60sec before continuing.
        


        print(reading) #For Testing


        row = row + 1 #Increments to next row.
        if result == None: #Checks to see if result is == to None, if so loop is no longer True and the cursor is closed.
            False 
            cursor.close() 


class GlucoseReading:
    def __init__(self, reading, row_id):
        self.reading = reading
        self.row_id = row_id


def write_glucose_data(url, glucose_reading, database_name="test"):
    try:
        client = MongoClient(url)
        db = client.get_database(database_name)


        collection = db["Sensor_data"]


        # Check if document with the same row_id exists
        existing_doc = collection.find_one({"row_id": glucose_reading.row_id})
        if existing_doc:
            print(f"Document with row_id {glucose_reading.row_id} already exists. Skipping insertion.")
        else:
            # Create a dictionary from GlucoseReading instance attributes
            reading_dict = {"reading": glucose_reading.reading, "row_id": glucose_reading.row_id}


            # Insert the reading into the collection
            collection.insert_one(reading_dict)
            print("Reading inserted successfully")


    except ConnectionFailure:
        print("Failed to connect to MongoDB.")
    except DuplicateKeyError:
        print(f"Duplicate key error: Document with row_id {glucose_reading.row_id} already exists.")
    except Exception as e:
        print(f"An error occurred: {e}")


def read_glucose_monitor(database_file, url):
    try:
        sqliteConnection = sqlite3.connect(database_file) # Connects to database
        cursor = sqliteConnection.cursor()
        
        row = 1
        while True:
            query = 'SELECT readings FROM database WHERE row_id = {}'.format(row) # SQL query that selects reading based on row.
            cursor.execute(query)
            result = cursor.fetchone()


            if result is not None:  # Check if result is not None
                reading = result[0]  # Takes data out of tuple


                # Create GlucoseReading instance
                glucose_reading = GlucoseReading(reading, row)
                
                # Function call to write data to centralized database hosted in the cloud
                write_glucose_data(url, glucose_reading)
                time.sleep(60) # Wait 60 seconds before continuing.


                print(reading) # For Testing


                row += 1 # Increment to next row.
            else:
                break  # Exit the loop if result is None


    except sqlite3.Error as error:
        print("Error while connecting to SQLite", error)
    finally:
        if (sqliteConnection):
            cursor.close() # Close the cursor
            sqliteConnection.close() # Close the connection


if __name__ == "__main__":
    database_file = "mockdata.db"
    url = "mongodb+srv://Flanderzz:Devine23@diabeticapp.hwarzip.mongodb.net/"
    read_glucose_monitor(database_file)
