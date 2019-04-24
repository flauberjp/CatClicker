$(function() {
    // ========= MODEL ============
    var model = {
        adminModeActivated: false,
        selectedCat: null,
        cats: [
            {
                name: 'jetske',
                cliques: 0,
                url: 'img/cats/jetske.jpg' 
            },
            {
                name: 'bicolour',
                cliques: 0,
                url: 'img/cats/bicolour.jpg' 
            },
            {
                name: 'chewie',
                cliques: 0,
                url: 'img/cats/chewie.jpg' 
            },
            {
                name: 'iceandfire',
                cliques: 0,
                url: 'img/cats/iceandfire.jpg' 
            },
            {
                name: 'poplinre',
                cliques: 0,
                url: 'img/cats/poplinre.jpg' 
            },
        ],
        init: function() {
            this.selectedCat = model.cats[0];
        }
    };


    // ========= OCTOPUS ============
    var octopus = {
        incClique: function(cat) {
            model.selectedCat.cliques += 1;
            viewGatoSelecionado.render();
        },

        getAllCats: function() {
            return model.cats;
        },

        getSelectedCat: function() {
            return model.selectedCat;
        },

        setSelectedCat: function(cat) {
            model.selectedCat = cat;
        },

        atualizaViewGatoSelecionado: function() {
            viewGatoSelecionado.render();
            octopus.atualizaViewAdminArea();
        },

        editar: function() {
            viewAdminArea.adminArea_nome.value = model.selectedCat.name;
            viewAdminArea.adminArea_cliques.value = model.selectedCat.cliques;
            viewAdminArea.adminArea_url.value = model.selectedCat.url;
            viewAdminArea.show();
        },

        cancelar: function() {
            viewAdminArea.hide();
        },
        salvar: function() {
            model.selectedCat.name = viewAdminArea.adminArea_nome.value;
            model.selectedCat.cliques = Number(viewAdminArea.adminArea_cliques.value);
            model.selectedCat.url = viewAdminArea.adminArea_url.value;
            viewAdminArea.hide();
            viewCatList.render();
            viewGatoSelecionado.render();
        },
        atualizaViewAdminArea: function() {
            viewAdminArea.adminArea_nome.setAttribute("value", model.selectedCat.name);
            viewAdminArea.adminArea_cliques.setAttribute("value", model.selectedCat.cliques);
            viewAdminArea.adminArea_url.setAttribute("value", model.selectedCat.url);
        },
        init: function() {
            model.init();
            viewCatList.init();
            viewGatoSelecionado.init();
            viewAdminArea.init();
            viewAdminArea.hide();
            viewCatList.render();
            viewGatoSelecionado.render();

            octopus.atualizaViewAdminArea();
        }

    };

    // ========= VIEWS ============
    var viewCatList = {
        init: function() {
            this.catList = document.getElementById('catsList');
            this.editarLink = document.getElementById('editarLink');
            editarLink.addEventListener('click', function() {
                   return octopus.editar();
            });
        },
        render: function() {
            
            while (this.catList.hasChildNodes()) {
                this.catList.removeChild(this.catList.lastChild);
            }

            octopus.getAllCats().forEach(function(cat){
                var elem = document.createElement('li');
                var catNameLink = document.createElement('a');
                catNameLink.innerText = cat.name;
                elem.appendChild(catNameLink);

                catNameLink.addEventListener('click', (function(catCopy) {
                    return function() {
                        octopus.cancelar();
                        octopus.setSelectedCat(catCopy);
                        octopus.atualizaViewGatoSelecionado();
                    }
                })(cat));

                viewCatList.catList.appendChild(elem);
            });
        }
    };

    var viewGatoSelecionado = {
        init: function() {
            this.catHome = document.getElementById("cat-name");
            this.catCliques = document.getElementById("cat-cliques")
            this.catFoto = document.getElementById("cat-foto");
        },
        render: function(){
            this.selectedCat = octopus.getSelectedCat();
            viewGatoSelecionado.catHome.innerText = this.selectedCat.name;
            viewGatoSelecionado.catCliques.innerText = this.selectedCat.cliques;
            viewGatoSelecionado.catFoto.setAttribute("src", this.selectedCat.url);
            viewGatoSelecionado.catFoto.onclick = (function(catCopyOfTheCopy) {
                return function() {
                    octopus.incClique(catCopyOfTheCopy);

                }
            })(this.selectedCat);
        }
    };

    var viewAdminArea = {
        init: function() {
            this.adminArea = document.getElementById("adminArea");
            this.ocultarButton = document.getElementById('ocultarButton');
            ocultarButton.addEventListener('click', function() {
                   octopus.cancelar();
            });

            this.adminArea_nome = document.getElementById("adminArea_nome");
            this.adminArea_cliques = document.getElementById("adminArea_cliques");
            this.adminArea_url = document.getElementById("adminArea_url");

            document.getElementById('form').addEventListener('submit', function(evt){
                evt.preventDefault();
                octopus.salvar();
                octopus.cancelar();
            })

        },
        show: function() {
            this.adminArea.style.visibility = "visible";
        },
        hide: function() {
            this.adminArea.style.visibility = "hidden";
        },
        render: function(){
        }
    };

    octopus.init();
});