const OpenAI =
  require("openai");

const client =
  new OpenAI({

    apiKey:
      process.env.OPENAI_API_KEY

  });


const generateSummary =
async (resumeText) => {

  const response =
    await client.chat.completions.create({

      model: "gpt-4.1-mini",

      messages: [

        {
          role: "system",

          content:
            "You are an AI recruitment assistant."
        },

        {
          role: "user",

          content:
            `Summarize this resume:
             ${resumeText}`
        }

      ]

    });

  return response
    .choices[0]
    .message.content;

};

module.exports = {
  generateSummary
};