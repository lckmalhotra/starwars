(function () {
    angular
        .module('starwars')
        .component('planets', planets());

    function planets() {
        let CDO = {
            templateUrl: './app/components/planets/planets.html',
            controllerAs: 'model',
            controller: PlanetsController,
            bindings : {
                list : '<'
            }
        };

        function PlanetsController($scope, $element) {
            let vm = $scope.model,
                chart = $element.children()[0];

            function renderChart (data){
                console.log($element);
                let width = $($element).find('.planet-com').width(), height = $($element).find('.planet-com').height(),
                    margins = {
                    'left': 40,
                    'right': 30,
                    'top': 30,
                    'bottom': 30
                    },
                    domainWidth = width - margins.left - margins.right,
                    domainHeight = height - margins.top - margins.bottom;

                var svg = d3.select(chart).append('svg')
                    .attr('width', width).attr('height', height).append('g')
                    .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

                var circles = svg.selectAll('g').data(data).enter().append('g').attr('class', 'node')
                    .attr('transform', function(d,i) {
                        if(data.length === 1){
                            return 'translate(' + (domainWidth/2) + ',' + (domainHeight/2) + ')';
                        }else{
                            return 'translate(' + (i*130) + ',' + leftPad(d.population,20) + ')';
                        }
                    });

                var circle = circles.append('circle')
                    .attr('class','planet-circle')
                    .attr('r', 0)
                    .attr('fill', '#fff')
                    .attr('dy', function(d,i){ return i * 10; })
                    .attr('dx', function(d,i){ return i * 10; })
                    .transition()
                    .duration(800)
                    .delay(function(d,i){ return i*100;})
                    .attr('r', function(d,i){ return leftPad(d.population,2);});

                circles.append('text')
                    .text(function(d){
                        return d.name;
                    })
                    .attr('dy',function(d){ return leftPad(d.population,1) * 3.8; })
                    .attr('text-anchor','middle')
                    .attr('fill','red').attr('font-size',10);

                function leftPad(number, targetLength) {
                    var output = number + '';
                    return parseInt(output.length*targetLength);
                }
            }


            vm.$onChanges =  function(obj) {
                if(obj.list.currentValue){
                    angular.element(chart).find('svg').remove();
                    renderChart(obj.list.currentValue);
                }
            };

            vm.$onDestroy = function() {
                vm = null;
            };
        }

        PlanetsController.$inject = ['$scope','$element'];

        return CDO;
    }

})();
