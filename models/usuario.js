const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        required: true,
    },
    google: {
        type: Boolean,
        default: false
    },
});


UsuarioSchema.methods.toJSON = function() {
    const {__v, _id, password, ...object} = this.toObject();

    object.uid = _id;
    return object;
}

module.exports = model('Usuario', UsuarioSchema);