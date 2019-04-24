class Cat {
    constructor(nome, cliques = 0, selecionado = false) {
        this.nome = nome;
        this.cliques = cliques;
        this.url = 'img/cats/' + this.nome + '.jpg'; 
        this.selecionado = selecionado;
    }
}

$(function(){
    var model = {
        init: function() {
            if (!localStorage.cats) {
                cats = [];
                var catsNames = ['jetske', 'bicolour', 'chewie', 'iceandfire', 'poplinre'];
                catsNames.sort();
                for (var i = 0; i < catsNames.length; i++) {
                    var cat = new Cat(catsNames[i]);
                    cats.push(cat);
                }
                localStorage.cats = JSON.stringify(cats);
            }
        },
        getAllCats: function() {
            return JSON.parse(localStorage.cats);
        }
    };


    var octopus = {
        incClique: function(cat) {
            var cats = model.getAllCats();
            for (var i = 0; i < cats.length; i++) {
                if (cats[i].nome == cat.nome) {
                    cats[i].cliques += 1;
                    break;
                }
            };
            localStorage.cats = JSON.stringify(cats);
            viewGatoSelecionado.render();
        },

        getAllCats: function() {
            var cats = model.getAllCats();
            return cats;
        },

        getSelectedCat: function() {
            var result = null;
            var cats = model.getAllCats();
            for (var i = 0; i < cats.length; i++) {
                if (cats[i].selecionado) {
                    result = cats[i];
                    break;
                }
            };
            return result;
        },

        setSelectedCat: function(cat) {
            var cats = model.getAllCats();
            for (var i = 0; i < cats.length; i++) {
                cats[i].selecionado = cats[i].nome == cat.nome;
            };
            localStorage.cats = JSON.stringify(cats);
        },

        AtualizaViewGatoSelecionado: function() {
            viewGatoSelecionado.init();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.catList = $('#catsList');
            view.render();
        },
        render: function(){
            octopus.getAllCats().forEach(function(cat){
                var elem = document.createElement('li');
                var catNameLink = document.createElement('a');
                catNameLink.innerText = cat.nome;
                elem.appendChild(catNameLink);

                catNameLink.addEventListener('click', (function(catCopy) {
                    return function() {
                        octopus.setSelectedCat(catCopy);
                        octopus.AtualizaViewGatoSelecionado();
                    }
                })(cat));

                document.getElementById('catsList').appendChild(elem);
            });
        }
    };

    var viewGatoSelecionado = {
        init: function() {
            viewGatoSelecionado.render();
        },
        render: function(){
            this.selectedCat = octopus.getSelectedCat();
            document.getElementById("cat-nome").innerText = this.selectedCat.nome;
            document.getElementById("cat-cliques").innerText = this.selectedCat.cliques;
            var foto = document.getElementById("cat-foto");
            foto.setAttribute("src", this.selectedCat.url);
            foto.onclick = (function(catCopyOfTheCopy) {
                return function() {
                    octopus.incClique(catCopyOfTheCopy);

                }
            })(this.selectedCat);
        }
    };

    octopus.init();
});