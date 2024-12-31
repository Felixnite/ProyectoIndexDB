let db;

document.addEventListener('DOMContentLoaded', () => {
    crmDB();
});

function crmDB() {
    const request = window.indexedDB.open('crmDB', 1);

    request.onerror = function() {
        console.log('Error al crear la db');
    };

    request.onsuccess = function() {
        console.log('Db creada con exito');
        db = request.result;
        // Call crearCliente after the database is fully set up
        crearCliente();
    };

    request.onupgradeneeded = function(e) {
        console.log('prueba');
        const db = e.target.result;
        const objectStore = db.createObjectStore('crmDB', {
            keyPath: 'id',
            autoIncrement: true
        });

        // Define the columns
        objectStore.createIndex('nombre', 'nombre', { unique: false });
        objectStore.createIndex('email', 'email', { unique: true });
        objectStore.createIndex('telefono', 'telefono', { unique: false });
    };
}

function crearCliente() {
    if (!db) {
        console.log("Database not yet available");
        return;
    }

    const transaction = db.transaction(['crmDB'], 'readwrite');
    transaction.oncomplete = function() {
        console.log('Transaccion completada');
    };

    transaction.onerror = function() {
        console.log('Error al crear el cliente');
    };

    const objectStore = transaction.objectStore('crmDB');
    const nuevoCliente = {
        nombre: 'Juan',
        email: 'juan@gmail.com',
        telefono: '123456'
    };

    let peticion = objectStore.add(nuevoCliente);
    console.log(peticion);
}
