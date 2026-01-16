import { getAllUsers, getUserById, deleteUser, createUser, updateUser } from "../services/user.service.js";
import { trace } from '@opentelemetry/api';
import { metrics } from '@opentelemetry/api';

const tracer = trace.getTracer('user-controller-tracer');

export const getUsers = async (req, res) => {
    const span = tracer.startSpan('getUsers');
    try {
        // TODO: Añadir un pequeño timeout dentro del try/catch para simular una operación asíncrona, usando 'await new Promise(resolve => setTimeout(resolve, 100));'. Observar, cómo afecta al span creado
        await new Promise(resolve => setTimeout(resolve, 100));
        const users = getAllUsers();
        span.setAttribute('user.count', users.length);  // Esto es un atributo personalizado
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        span.end(); // Es importante cerrar siempre el span
    }
};

export const getUser = (req, res) => {
    try {
        const { id } = req.params;
        const user = getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch(error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const removeUser = (req, res) => {
    try {
        const { id } = req.params;
        const user = deleteUser(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch(error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const meter = metrics.getMeter('user-controller-meter');
const UserCreationCounter = meter.createCounter('user_creation_count', {
    description: 'Counts number of users created',
    unit: "users"
});

export const addUser = (req, res) => {
    try {
        const user = createUser(req.body);
        UserCreationCounter.add(1);
        res.status(201).json(user);
    } catch(error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const putUser = (req, res) => {
    try {
        const { id } = req.params;
        const user = updateUser(id, req.body);
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}