import random
from datetime import datetime
from flask import Flask, jsonify
from fake import FAKER


app = Flask(__name__)


class SensorData:
    def __init__(self, id):
        self.id = id
        self.co2 = random.randint(400, 1000)
        self.created_at = FAKER.date(start_date="today", end_date="+30d")
        self.dust = random.randint(50, 300)
        self.humidity = random.uniform(0, 100)
        self.pressure = random.randint(980, 1020)
        self.temperature = random.uniform(15, 30)

    def to_json(self):
        return {
            "id": self.id,
            "co2": self.co2,
            "created_at": self.created_at,
            "dust": self.dust,
            "humidity": self.humidity,
            "pressure": self.pressure,
            "temperature": self.temperature,
        }


data = []
for i in range(150):
    data.append(SensorData(i).to_json())


@app.route("/all")
def all():
    return jsonify(data)


app.run(port=5555)
