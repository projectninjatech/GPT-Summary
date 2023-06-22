const articleTxt = document.getElementById('article-txt');
const submitButton = document.getElementById('submit');
const summaryTxt = document.querySelector('.summary-txt');
const wordsCount = document.getElementById('words_count');

submitButton.addEventListener("click", async() => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify( { article: articleTxt.value})
        }

        var response = await fetch('/summary', options);
        var responseData = await response.json();
        // summaryTxt.textContent = responseData.summary;
        // wordsCount.innerHTML += responseData.words_count;
        console.log(responseData);

        const summary = responseData.summary;
        const wordsCountValue = responseData.words_count
        function typeSummary(index) {
            if (index < summary.length) {
                const currentText = summary.substring(0, index + 1);

                summaryTxt.textContent = currentText;

                setTimeout(function() {
                    typeSummary(index + 1);
                }, 50);
            } else {
                wordsCount.innerHTML += wordsCountValue;
            }
        }

        typeSummary(0);
    } catch (error) {
        console.error("Error:", error);
    }
})