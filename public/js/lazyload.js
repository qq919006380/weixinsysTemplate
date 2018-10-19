/**
 * 用于配置依赖加载项信息
 */

app.constant('JQ_CONFIG', {

});

app.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {

	$ocLazyLoadProvider.config({
        debug:  false,
        events: true,
        modules: [{
            name: 'toaster',
            files: [
                  'vendor/modules/angularjs-toaster/toaster.js',
                  'vendor/modules/angularjs-toaster/toaster.css'
            ]
        },{
            name: 'ui.select',
            files: [
                  'vendor/modules/angular-ui-select/select.min.js',
                  'vendor/modules/angular-ui-select/select.min.css'
              ]
        },{
            name: 'ui.grid',
            files: [
                  'vendor/modules/angular-ui-grid/ui-grid.min.js',
                  'vendor/modules/angular-ui-grid/ui-grid.min.css'
              ]
        },{
            name: 'ui.grid.pagination',
            files: [
                  'vendor/modules/angular-ui-grid/ui-grid.min.js',
                  'vendor/modules/angular-ui-grid/ui-grid.min.css'
              ]
        },{
            name: 'ui.grid.selection',
            files: [
                  'vendor/modules/angular-ui-grid/ui-grid.min.js',
                  'vendor/modules/angular-ui-grid/ui-grid.min.css'
              ]
        },{
            name: 'ui.grid.edit',
            files: [
                  'vendor/modules/angular-ui-grid/ui-grid.min.js',
                  'vendor/modules/angular-ui-grid/ui-grid.min.css'
              ]
        },{
            name: 'ui.grid.rowEdit',
            files: [
                  'vendor/modules/angular-ui-grid/ui-grid.min.js',
                  'vendor/modules/angular-ui-grid/ui-grid.min.css'
              ]
        },{
                name: 'ui.grid.validate',
                files: [
                    'vendor/modules/angular-ui-grid/ui-grid.min.js',
                    'vendor/modules/angular-ui-grid/ui-grid.min.css'
                ]
            },{
            name: 'ui.grid.autoResize',
            files: [
                  'vendor/modules/angular-ui-grid/ui-grid.min.js',
                  'vendor/modules/angular-ui-grid/ui-grid.min.css'
              ]
        },{
            name: 'pascalprecht.translate',
            files: [
                  'vendor/angular/angular-translate/angular-translate.js',
                  'vendor/angular/angular-translate/loader-static-files.js',
                  'vendor/angular/angular-translate/storage-cookie.js',
                  'vendor/angular/angular-translate/storage-local.js'
              ]
        },{
            name: 'ngFileUpload',
            files: [
                  'vendor/angular/ngfile/ng-file-upload-shim.min.js',
                  'vendor/angular/ngfile/ng-file-upload.min.js'
            ]
        }, {
            name: 'ui.grid.resizeColumns',
            files: [
                'vendor/modules/angular-ui-grid/ui-grid.min.js',
                'vendor/modules/angular-ui-grid/ui-grid.min.css'
            ]
        },{
            name: 'ui.grid.grouping',
            files: [
                'vendor/modules/angular-ui-grid/ui-grid.min.js',
                'vendor/modules/angular-ui-grid/ui-grid.min.css'
            ]
        },]
    });
}]);