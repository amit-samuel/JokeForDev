//IIFE
var pokemonRepository = (function () {
    var pokemonList = [];
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
    function add(item) {
        pokemonList.push(item);
    }
    function getAll() {
        return pokemonList;
    }
    function loadList() {
        return $.ajax(apiUrl, {
            dataType: "json"
        })
            .then(function (item) {
                $.each(item.results, function (index, item) {
                    var pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }
    function loadDetails(item) {
        var url = item.detailsUrl;
        return $.ajax(url, {
            dataType: "json"
        })
            .then(function (details) {
                // Now we add the details to the item
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            })
            .catch(function (e) {
                console.error(e);
            });
    }
    function showDetails(item) {
        loadDetails(item).then(function () {
            showModal(item);
        });
    }
    var modalContainer = $("#modal-container");

    function showModal(pokemon) {
        //Clear all existing modal content
        modalContainer.empty();
        var modal = $('<div class="shown.bs.modal"></div>');
        // $("body").append(modal);
        // Add the new modal content
        var closeButtonElement = $('<button class="btn btn-secondary" type="modal-close"></button>').text(
            "Close"
        );
        closeButtonElement.on("click", hideModal);
        var titleElement = $("<h1></h1>").text(pokemon.name);
        var contentElement = $("<p></p>").text(pokemon.height);
        var imgElement = $("<img>");
        imgElement.attr("src", pokemon.imageUrl);
        modal.append(closeButtonElement);
        modal.append(titleElement);
        modal.append(contentElement);
        modal.append(imgElement);
        modalContainer.append(modal);
        modalContainer.addClass("is-visible");
        modalContainer.click(function (e) {
            var target = e.target;
            console.log(e.target);
            if (target === modalContainer) {
                hideModal();
            }
        });
    }
    //muss noch bearbeiten
    function addListItem(pokemon) {
        var listItem = $("<li class='list-group'></li>");
        var button = $("<a href='#' class='list-group-item list-group-item-action'></a>").text(pokemon.name);
        $(".list-group").append(listItem);
        $(listItem).append(button);
        button.click(function (e) {
            showDetails(pokemon);
        });
    }
    function hideModal() {
        modalContainer.removeClass("is-visible");
    }
    window.addEventListener("keydown", (e) => {
        if (
            e.key === "Escape" &&
            $("#modal-container").classList.contains("is-visible")
        ) {
            hideModal();
        }
    });
    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal,
        addListItem: addListItem
    };
})();
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});