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
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                var pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            })
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        var url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
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
        var tmp = loadDetails(pokemon);
        var modalContainer = $('#modal-container');

        // Clear all existing modal content
        modalContainer.innerHTML = ''; //
        var modal = $('<div class="modal"/>');
        // Add the new modal content
        var closeButtonElement = $('<button class="modal-close"/>').text('Close');
        closeButtonElement.addEventListener('click', hideModal);
        var titleElement = $('<h1/>').text(pokemon.name);
        var contentElement = $('<p/>').text(pokemon.height);
        var imgElement = $('<img/>');
        imgElement.imageUrl = pokemon.imageUrl;
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imgElement);
        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');
        $('.modalContainer').click((function (e) {
            var target = e.target;
            console.log(e.target)
            if (target === modalContainer) {
                hideModal();
            }
        }))
    }

    function addListItem(pokemone) {
        var container = $('.pokemon-list');
        var listItem = $('<li/>');
        var button = $('<button/>').text(pokemone.name);
        container.appendChild(listItem);
        listItem.appendChild(button);
        $('.button').click((function (e) {
            showDetails(pokemone);
        }))
    }



    function hideModal() {
        var modalContainer = $('#modal-container');
        modalContainer.classList.remove('is-visible');

    }



    window.addEventListener('keydown', (e) => {
        var modalContainer = $('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
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







