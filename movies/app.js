$(document).ready(function () {
  const apiKey = 'fdb715f7';

  $('#search-btn').click(function () {
    const movieTitle = $('#movie-input').val().trim();

    if (!movieTitle) {
      alert('Please enter a movie title.');
      return;
    }

    $.ajax({
      url: `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`,
      method: 'GET',
      success: function (data) {
        if (data.Response === 'False') {
          alert('Movie not found!');
          $('#movie-card').hide();
          return;
        }

        $('#poster').attr('src', data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/150');
        $('#title').text(data.Title);
        $('#year').text(data.Year);
        $('#genre').text(data.Genre);
        $('#director').text(data.Director);
        $('#rating').text(data.imdbRating);
        $('#plot').text(data.Plot);
        $('#movie-card').fadeIn();
      },
      error: function () {
        alert('Something went wrong. Please try again.');
      }
    });
  });
});
