import json

# Given text
with open("output.txt","r") as output:
    given_text = output.read()
# Remove unnecessary whitespaces
cleaned_text = given_text.strip()

# Split the text into lines
lines = cleaned_text.split('\n')

# Initialize dictionary to store the data
data = {}

# Parse each line to extract key-value pairs
for line in lines:
    if ':' in line:
        key, value = line.split(':', 1)
        data[key.strip()] = value.strip()

# Convert to JSON format
json_data = json.dumps(data, indent=4)

# Print the JSON data
print(json_data)
