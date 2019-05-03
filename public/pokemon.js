angular.module('pokedir',[])
    .controller('pokeCtrl',PokeCtrl)
    .factory('pokeApi',pokeApi)
    .constant('apiUrl','http://localhost:1337'); // CHANGED for the lab 2017!

function PokeCtrl($scope, pokeApi){
    $scope.pokemons=[]; //Initially all was still
    $scope.selectedPokemon=[];
    $scope.pokeEvo=[];

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
        $scope.selectedPokemon=[];
        $scope.pokeEvo=[];
        pokeApi.getSpecific(id)
            .success(function(data){
                $scope.selectedPokemon=data[0];

                if(data[1][0].lineName=='Eevee'){
                    if(data[0][0].name==' Vaporeon'){
                        $scope.pokeEvo[0]=[data[1][0],data[1][1]];
                    } else if(data[0][0].name==' Jolteon'){
                        $scope.pokeEvo[0]=[data[1][0],data[1][2]];
                    } else if(data[0][0].name==' Flareon'){
                        $scope.pokeEvo[0]=[data[1][0],data[1][3]];
                    } else {
                        $scope.pokeEvo[0]=[data[1][0],data[1][1]];
                        $scope.pokeEvo[1]=[data[1][0],data[1][2]];
                        $scope.pokeEvo[2]=[data[1][0],data[1][3]];
                    }
                } else {
                    $scope.pokeEvo[0]=data[1];
                }
                loading=false;
            })
            .error(function(){
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