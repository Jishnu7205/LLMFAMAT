const express = require("express");
const User = require("../models/user");
const Prompt = require("../models/prompt")
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const path = require('path')
const { HfInference } = require("@huggingface/inference");

const loginController = expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    console.log("fetched user Data", user);
    console.log(await user.matchPassword(password));
    if (user && (await user.matchPassword(password))) {
      const response = {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      };
      console.log(response);
      res.json(response);
    } else {
      res.status(401).send("Invalid UserName or Password");
    //   throw new Error("Invalid UserName or Password");
    }
  });

const signupController = expressAsyncHandler(async (req, res) => {
    try {
        // console.log(req.body);
        const { name, email, password } = req.body;

        // check for all fields
        if (!name || !email || !password) {
            res.status(400).send("All necessary input fields have not been filled");
            return;
        }

        // pre-existing user
        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(405).send("User already exists");
            return;
        }

        // create an entry in the db
        const user = await User.create({ name, email, password });
        
        // sending success response
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});


const historyController = expressAsyncHandler(async (req, res) => {
  try {
    // Get the userId from query parameters
    const { userId } = req.query;
    console.log(userId);
    
    // Fetch user by ID and populate the prompt and conversation data
    const user = await User.findById(userId).populate({
      path: 'prompt',
      populate: {
        path: 'conversation'
      }
    });

    // Check if user exists
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    // Extract history from user prompts
    const history = user.prompt;
    
    // Send the history in the response
    res.status(200).json(history);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

const chatController = expressAsyncHandler(async(req, res) => {
  const {title} = req.body;
  const {user} = req.params; //userID 
  try {
    if (!title) {
        res.status(400).send("Title is Empty");
        return;
    }

    // create an entry in the (prompt) db
    const prompt = await Prompt.create({ title });

    // Add the id of prompt into the (user) db
    const userData = await User.findOneAndUpdate(
      { _id: user },
      { $push: { prompt: prompt._id } },
      { new: true }
    );

    if (!userData) {
      res.status(404).send("User not found");
      return;
    }

    // Sending success response
    res.status(201).json({
      title: prompt.title,
      userId: userData._id,
      promptId: prompt._id,
    });
  } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
  }
})

const inference = new HfInference("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");
async function query(question) {
  let responseContent = '';

  for await (const chunk of inference.chatCompletionStream({
      model: "google/gemma-2b-it",
      messages: [{ role: "user", content: question }],
      max_tokens: 100,
  })) {
      responseContent += chunk.choices[0]?.delta?.content || "";
  }

  return responseContent.replaceAll("*", "");
}
// async function query(data) {
// 	const response = await fetch(
// 		"https://api-inference.huggingface.co/models/google/gemma-2b",
// 		{
// 			headers: {
// 				Authorization: "Bearer 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",
// 				"Content-Type": "application/json",
// 			},
// 			method: "POST",
// 			body: JSON.stringify(data),
// 		}
// 	);
// 	const result = await response.json();
// 	return result;
// }



const queryController = expressAsyncHandler(async (req, res) => {
  try {
      const { user, titleId } = req.params;
      const { question } = req.body;

      // Call the query function with the question
      const queryResponse = await query(question);
      console.log("Query Response:", queryResponse);

      // Use the response directly as the answer
      const answer = queryResponse || "No answer generated";
      
      // Update the prompt in the database
      const updatedPrompt = await Prompt.findOneAndUpdate(
          { _id: titleId },
          {
              $push: { conversation: { question: question, answer: answer } }
          },
          { new: true, runValidators: true }
      );

      if (!updatedPrompt) {
          return res.status(404).send("Prompt not found");
      }

      // Respond with the updated conversation
      res.status(200).json({
          conversation: updatedPrompt.conversation
      });
  } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
  }
});



const displayQueryController = expressAsyncHandler(async (req, res) => {
  try {
    console.log(req.params);
    
      const { user, titleId } = req.params;

      // Fetch the prompt and populate the conversation
      const prompt = await Prompt.findOne({ _id: titleId }).populate('conversation');

      if (!prompt) {
          return res.status(404).send("Prompt not found");
      }
      
      // Send the conversation in the response
      res.status(200).json({ conversation: prompt.conversation, title: prompt.title });
  } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
  }
});


module.exports = { 
  loginController,
  signupController, 
  historyController, 
  chatController, 
  queryController,
  displayQueryController,
 };
