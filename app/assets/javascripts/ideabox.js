$(document).ready(function() {
  appendIdea();
  fetchIdeas();
});

function fetchIdeas() {
  $.ajax({
    type: "GET",
    url: "api/v1/ideas",
    success: function(ideas) {
      $.each(ideas, function(index, idea) {
        renderIdea(idea);
      });
      $(".delete").on("click", deleteIdea);
      $(".edit").on("click", editIdea);
      $(".update").on("click", updateIdea);
    }
  })
}

appendIdea = function() {
  $('#newIdea').on('click', function(event) {
    createIdea();
  });
}

function renderIdea(idea) {
  $("#ideas").append(
  "<div class='idea' data-id=" +
  idea.id +
  "><h6>" +
   idea.title +
   "</h6><p>" +
   idea.body +
   "</p>" +
   '<div class="buttons">' +
   '<button class="edit">Edit</button>' +
   '<button class="delete">Delete</button>' +
   '<form class="edit-idea-form">' +
   '<label>Title</label>' +
   '<input type="text" placeholder="Title" class="idea-title">' +
   '<label>Body</label>' +
   '<input type="text" placeholder="Body" class="idea-body">' +
   '<input type="submit" class="update" value="Update Idea">' +
   '</form>' +
   '</div>' +
   '</div>'
   )
}

createIdea = function() {
  var $title = $('#newIdeaTitle').val();
  var $body = $('#newIdeaBody').val();
  $.ajax({
    type: "POST",
    url: "api/v1/ideas",
    data: { idea: {title: $title, body: $body} },
    sucess: function(data) {
      appendIdea(data);
      $('#newIdeaTitle').val('');
      $('#newIdeaBody').val('');
    }
  });
}

function deleteIdea() {
    var $idea = $(this).parents('.idea');
    var id = $idea.data('id');
    $.ajax('api/v1/ideas/' + id, { method: "delete" }).then(function() {
      $idea.remove();
    });
}

function editIdea() {
    var $idea = $(this).parents('.idea');
    var $form = $(this).siblings('.edit-idea-form')
    if($form.is(':hidden')) {
      var title = $idea.find('h6').text();
      var body = $idea.find('p').text();
      $form.find('.idea-title').val(title);
      $form.find('.idea-body').val(body);
    }
    $form.toggle();
}

function updateIdea(idea) {
  console.log($(this))
    var $idea = $(this).parents('.idea');
    var id = $idea.data('id');
    var $title = $(this).siblings('.idea-title').val();
    var $body = $(this).siblings('.idea-body').val();

    $.ajax({
      type: "PUT",
      url: "api/v1/ideas" + id,
      data: {title: $title, body: $body},
      sucess: function(idea) {
        $idea.find('h6').text(idea.title);
        $idea.find('p').text(idea.body);
        $idea.find('form').hide();
      }
    });
}
