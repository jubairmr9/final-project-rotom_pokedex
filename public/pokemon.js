angular.module('pokedir',[])
    .controller('pokeCtrl',PokeCtrl)
    .factory('pokeApi',pokeApi)
    .constant('apiUrl','http://localhost:1337'); // CHANGED for the lab 2017!

function PokeCtrl($scope, pokeApi){
    $scope.pokemons=[]; //Initially all was still
    $scope.selectedPokemon=[];

    $scope.errorMessage='';
    $scope.isLoading=isLoading;
    $scope.refreshPokemon=refreshPokemon;
    $scope.selectPokemon=selectPokemon;


    var loading = false;

    function isLoading(){
        return loading;
    }

    function refreshPokemon(){
        loading=true;
        $scope.errorMessage='';
        pokeApi.getPokemon()
            .success(function(data){
                $scope.pokemons=data;
                loading=false;
            })
            .error(function () {
                $scope.errorMessage="Unable to load Pokemon:  Database request failed";
                loading=false;
            });
    }

    function selectPokemon(id) {
        loading=true;
        $scope.errorMessage='';
        pokeApi.getSpecific(id)
            .success(function(data){
                $scope.selectedPokemon=data;
                loading=false;
            })
            .erroe(function(){
                $scope.errorMessage="Unable to select Pokemon";
            });
    }

    refreshPokemon();  //make sure the pokemon are loaded
}

function pokeApi($http,apiUrl){
    return{
        getPokemon: function(){
            var url = apiUrl + '/pokemon';
            return $http.get(url);
        },
        getSpecific: function (id) {
            var url =apiUrl + '/select?id='+id;
            return $http.get(url);
        }
    };
}