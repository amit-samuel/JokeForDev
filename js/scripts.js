//IIFE
var pokemonRepository = (function () {
    var pokemonList = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    var pokemontDetails = [];

    function add(item) {
        pokemonList.push(item);
    }
    function getAll() {
        return pokemonList;
    }
    function addDetails() {
        pokemontDetails.push(item);
    }

    function loadList() {
        return $.ajax(apiUrl, {
            dataType: 'json'
        }).then(function (item) {
            $.each(item.results, function(index, item) {
                var pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            })
        }).catch(function (e) {
            console.error(e);
        });
    }

    function loadDetails(item) {
        var url = item.detailsUrl;
        return $.ajax(url, {
            dataType: 'json'
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            return item;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            showModal(item);
        })
    }

    function showModal(pokemon) {
        var modalContainer = $('#modal-container').text('');
        var modal = $('<div class="modal"></div>');
        $('body').append(modal);
        // Add the new modal content
        var closeButtonElement = $('<button class="modal-close"></button>').text('Close');
        closeButtonElement.addEventListener('click', hideModal());
        var titleElement = $('<h1></h1>').text(pokemon.name);
        var contentElement = $('<p></p>').text(pokemon.height);
        var imgElement = $('<img>').imageURL(pokemon.imageUrl);
        modal.append(closeButtonElement);
        modal.append(titleElement);
        modal.append(contentElement);
        modal.append(imgElement);
        modalContainer.append(modal);
        modalContainer.classList.add('is-visible');
        modalContainer.click((function (e) {
            var target = e.target;
            console.log(e.target)
            if (target === modalContainer) {
                hideModal();
            }
        }))
    }

    //muss noch bearbeiten
    function addListItem(pokemone) {
        var listItem = $('<li>/');
        var button = $('<button/>').text(pokemone.name);
        $('.pokemon-list').append(listItem);
        $(listItem).append(button);
        button.click((function (e) {
            showDetails(pokemone);
        }));
    }



    function hideModal() {
        modal-container.classList.remove('is-visible');

    }



    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && $('#modal-container').classList.contains('is-visible')) {
            hideModal();
        }
    });


    return{
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal,
        addListItem: addListItem,

    };
})();


        pokemonRepository.loadList().then(function () {
        pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    })
});







