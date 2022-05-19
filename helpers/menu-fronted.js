const getMenuFrontEnd = (role = 'USER_ROLE') => {
    const menu = [
        {
            titulo: 'Principal',
            icon: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'ProgressBar', url: 'Progress' },
                { titulo: 'Gráficas', url: 'Gráfica1' },
                { titulo: 'Promesas', url: 'Promesas' },
                { titulo: 'Rxjs', url: 'Rxjs' },
            ]
        },
        {
            titulo: 'Mantenimientos',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                // { titulo: 'Usuarios', url: 'Usuarios' },
                { titulo: 'Hospitales', url: 'Hospitales' },
                { titulo: 'Médicos', url: 'Medicos' }
            ]
        }
    ];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'Usuarios' });
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}