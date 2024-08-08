const { HfInference } = require("@huggingface/inference");

const inference = new HfInference("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");

(async () => {
    for await (const chunk of inference.chatCompletionStream({
        model: "google/gemma-2b-it",
        messages: [{ role: "user", content: "What is the tensile strength of carbon" }],
        max_tokens: 500,
    })) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
})();
