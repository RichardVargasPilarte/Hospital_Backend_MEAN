"use strict";
(self["webpackChunkHospitalAngular"] = self["webpackChunkHospitalAngular"] || []).push([["src_app_pages_child-routes_module_ts"],{

/***/ 1896:
/*!***************************************!*\
  !*** ./src/app/guards/admin.guard.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminGuard": () => (/* binding */ AdminGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_usuario_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/usuario.service */ 5763);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 2816);



class AdminGuard {
    constructor(usuarioService, router) {
        this.usuarioService = usuarioService;
        this.router = router;
    }
    canActivate(route, state) {
        if (this.usuarioService.role === 'ADMIN_ROLE') {
            return true;
        }
        else {
            console.log('Bloqueado por el ADMIN GUARD');
            // this.usuarioService.logout();
            this.router.navigateByUrl('/Dashboard');
            return false;
        }
    }
}
AdminGuard.ɵfac = function AdminGuard_Factory(t) { return new (t || AdminGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_usuario_service__WEBPACK_IMPORTED_MODULE_0__.UsuarioService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router)); };
AdminGuard.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: AdminGuard, factory: AdminGuard.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 599:
/*!**********************************************!*\
  !*** ./src/app/pages/child-routes.module.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChildRoutesModule": () => (/* binding */ ChildRoutesModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard/dashboard.component */ 4789);
/* harmony import */ var _grafica1_grafica1_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grafica1/grafica1.component */ 5906);
/* harmony import */ var _progress_progress_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./progress/progress.component */ 3205);
/* harmony import */ var _accoutn_settings_accoutn_settings_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./accoutn-settings/accoutn-settings.component */ 3430);
/* harmony import */ var _promesas_promesas_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./promesas/promesas.component */ 3414);
/* harmony import */ var _rjxs_rjxs_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rjxs/rjxs.component */ 1053);
/* harmony import */ var _guards_admin_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../guards/admin.guard */ 1896);
/* harmony import */ var _perfil_perfil_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./perfil/perfil.component */ 2390);
/* harmony import */ var _busqueda_busqueda_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./busqueda/busqueda.component */ 8376);
/* harmony import */ var _mantenimientos_usuarios_usuarios_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mantenimientos/usuarios/usuarios.component */ 6987);
/* harmony import */ var _mantenimientos_hospitales_hospitales_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mantenimientos/hospitales/hospitales.component */ 5144);
/* harmony import */ var _mantenimientos_medicos_medicos_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./mantenimientos/medicos/medicos.component */ 7649);
/* harmony import */ var _mantenimientos_medicos_medico_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./mantenimientos/medicos/medico.component */ 4763);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 3184);










// Manteinimientos






const childRoutes = [
    {
        path: '',
        component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__.DashboardComponent,
        data: { titulo: 'Dashboard' },
    },
    {
        path: 'Progress',
        component: _progress_progress_component__WEBPACK_IMPORTED_MODULE_2__.ProgressComponent,
        data: { titulo: 'Progress' },
    },
    {
        path: 'Gráfica1',
        component: _grafica1_grafica1_component__WEBPACK_IMPORTED_MODULE_1__.Grafica1Component,
        data: { titulo: 'Gráfica1' },
    },
    {
        path: 'account-settings',
        component: _accoutn_settings_accoutn_settings_component__WEBPACK_IMPORTED_MODULE_3__.AccoutnSettingsComponent,
        data: { titulo: 'Account-settings' },
    },
    {
        path: 'Promesas',
        component: _promesas_promesas_component__WEBPACK_IMPORTED_MODULE_4__.PromesasComponent,
        data: { titulo: 'Promesas' },
    },
    {
        path: 'Rxjs',
        component: _rjxs_rjxs_component__WEBPACK_IMPORTED_MODULE_5__.RjxsComponent,
        data: { titulo: 'Rxjs' },
    },
    {
        path: 'Perfil',
        component: _perfil_perfil_component__WEBPACK_IMPORTED_MODULE_7__.PerfilComponent,
        data: { titulo: 'Perfil de usuario' },
    },
    {
        path: 'busqueda/:termino',
        component: _busqueda_busqueda_component__WEBPACK_IMPORTED_MODULE_8__.BusquedaComponent,
        data: { titulo: 'Busquedas' },
    },
    // Mantenimientos
    {
        path: 'Hospitales',
        component: _mantenimientos_hospitales_hospitales_component__WEBPACK_IMPORTED_MODULE_10__.HospitalesComponent,
        data: { titulo: 'Hospitales' },
    },
    {
        path: 'Medicos',
        component: _mantenimientos_medicos_medicos_component__WEBPACK_IMPORTED_MODULE_11__.MedicosComponent,
        data: { titulo: 'Medicos' },
    },
    {
        path: 'Medico/:id',
        component: _mantenimientos_medicos_medico_component__WEBPACK_IMPORTED_MODULE_12__.MedicoComponent,
        data: { titulo: 'Medico' },
    },
    {
        // ruta de admin
        path: 'Usuarios',
        canActivate: [_guards_admin_guard__WEBPACK_IMPORTED_MODULE_6__.AdminGuard],
        component: _mantenimientos_usuarios_usuarios_component__WEBPACK_IMPORTED_MODULE_9__.UsuariosComponent,
        data: { titulo: 'Usuarios' },
    },
];
class ChildRoutesModule {
}
ChildRoutesModule.ɵfac = function ChildRoutesModule_Factory(t) { return new (t || ChildRoutesModule)(); };
ChildRoutesModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineNgModule"]({ type: ChildRoutesModule });
ChildRoutesModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule.forChild(childRoutes)], _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsetNgModuleScope"](ChildRoutesModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app_pages_child-routes_module_ts.js.map