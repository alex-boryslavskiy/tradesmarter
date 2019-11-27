let testApp = angular.module('testApp', []);

testApp.controller('TestController', ['$scope', '$http', function ($scope, $http) {
    $scope.opened = false;

    $scope.filterOpenOnly = () => {
        $scope.opened = !$scope.opened;
    };

    const getStatus = (tradingHours, currentTime) => {
        return tradingHours.find((item) => currentTime >= item.from && currentTime <= item.to) ? 'open' : 'closed';
    };

    $scope.json = [];
    $http.get('./trading-hours.json').then(result => {
        const currentTime = new Date().getTime();
        $scope.json = result.data.map(item => {
            item.status = getStatus(item.tradingHours, currentTime);
            return item;
        });
    });
}]);
