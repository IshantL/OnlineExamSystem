

// Grabs questions from an extrenal JSON file, puts the result into a variable
function getQuestions() {
    $.ajax({
      url: 'practiceDemo_data.json',
      async: false,
      dataType: 'json',
      success: function(data) {
        allQuestions = data;
      }
    });
    return allQuestions;
  }