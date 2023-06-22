require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const app = express();
const { Configuration, OpenAIApi } = require("openai");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'hbs');
const PORT = 3000;

app.get('/', function(req,res) {
    res.render('index')
})


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);

app.post('/summary', async function(req,res) {
    // console.log(req.body.article)
    // res.json("Textarea value received in backend")

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        messages: [{"role": "user", "content": req.body.article}],
        functions: [
            {
                "name": "generate_summary",
                "description": "Generate summary of the given text",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "summary": {
                            "type": "string",
                            "description": "Generated summary of the given text"
                            },
                            "words_count": {
                                "type": "integer",
                                "description": "Count the number of words in the generated summary"
                            }
                        },
                        "required": ["summary", "words_count"]
                    }
                }
        ],
        function_call: {"name": "generate_summary"},
      });

      const response = JSON.parse(completion.data.choices[0].message.function_call.arguments)
      res.json(response)
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})