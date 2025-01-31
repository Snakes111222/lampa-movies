(function() {
    var plugin = {
        id: 'my_movies',
        name: 'Мои фильмы',
        version: '1.0',
        description: 'Плагин для просмотра фильмов из облака',
        moviesUrl: 'https://raw.githubusercontent.com/Snakes111222/lampa-movies/main/movies.json', // Твой JSON

        init: function() {
            Lampa.Plugins.add(plugin);
            Lampa.Listener.follow('app', function(e) {
                if (e.type === 'ready') {
                    plugin.loadMovies();
                }
            });
        },

        loadMovies: function() {
            Lampa.Utils.request(plugin.moviesUrl, function(data) {
                var json = JSON.parse(data);
                plugin.renderMovies(json.movies);
            }, function() {
                Lampa.Noty.show('Ошибка загрузки фильмов');
            });
        },

        renderMovies: function(movies) {
            var component = new Lampa.Component({
                name: plugin.name,
                render: function() {
                    var html = Lampa.Template.get('items_line', {title: plugin.name});

                    movies.forEach(function(movie) {
                        var item = Lampa.Template.get('card', {title: movie.title});

                        item.on('hover:enter', function() {
                            Lampa.Player.play({title: movie.title, url: movie.url});
                        });

                        html.append(item);
                    });

                    return html;
                }
            });

            Lampa.Component.add(component);
        }
    };

    plugin.init();
})();
