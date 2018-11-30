

// Grabs questions from an extrenal JSON file, puts the result into a variable
function getQuestionsExam() {
    $.ajax({
      url: 'examDemo_data.json',
      async: false,
      dataType: 'json',
      success: function(data) {
        allQuestions = data;
      }
    });
    return allQuestions;
  }