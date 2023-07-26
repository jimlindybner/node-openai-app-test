const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: "",
});

const openai = new OpenAIApi(config);

const runPrompt = async () => {
  const prompt = `
    Generate an SAT-level vocabulary and provide a definition. Return response in the following parsable JSON format:
    {
        "V": "Vocabulary",
        "D": "Definition"
    }
  `;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 2048,
    temperature: 1,
  });

  const responseJSON = response.data.choices[0].text;
  const responseParsed = JSON.parse(responseJSON);

  const vocabulary = responseParsed.V;
  const definition = responseParsed.D;

  console.log(`Vocabulary: ${vocabulary}`);
  console.log(`Definition: ${definition}`);
};

runPrompt();
