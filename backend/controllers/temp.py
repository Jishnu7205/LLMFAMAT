# import json
# from gradio_client import Client
# url = "https://2d50c9a8121fa701df.gradio.live/"
# input_data = {"prompt": "What is the fiber material used in Glass Fiber Reinforced Polymer?"}

# input_data_json= json.dumps(input_data)
# client = Client(url)
# result = client.predict(input_data_json, api_name="/predict")
# print(result)
# print(result["output"])
# import json
# import sys
# import io
# from gradio_client import Client

# # Set the standard output encoding to UTF-8
# sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# def main(question):
#     url = "https://2d50c9a8121fa701df.gradio.live/"
#     input_data = {"prompt": question}

#     input_data_json = json.dumps(input_data)
#     client = Client(url)
    
#     # Make sure to handle the case where the prediction fails
#     try:
#         result = client.predict(input_data_json, api_name="/predict")
#         print(json.dumps({"output": result["output"]}))
#     except Exception as e:
#         print(json.dumps({"error": str(e)}))

# if __name__ == "__main__":
#     question = sys.argv[1]
#     main(question)

import json
import sys
import io

# Set the standard output encoding to UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def main(question):
    # Directly return a predefined answer
    predefined_answers = {
        "What is the fiber material used in Glass Fiber Reinforced Polymer?": "The fiber material used in Glass Fiber Reinforced Polymer (GFRP) is typically glass fiber.",
        "What is the capital of France?": "The capital of France is Paris.",
        "What is the boiling point of water?": "The boiling point of water is 100 degrees Celsius at sea level."
    }
    
    # Get the answer or a default message if the question is not predefined
    answer = predefined_answers.get(question, "Sorry, I don't have an answer for that.")
    
    # Print the result as JSON
    print(json.dumps({"output": answer}))

if __name__ == "__main__":
    # Get the question from command line arguments
    question = sys.argv[1]
    main(question)
