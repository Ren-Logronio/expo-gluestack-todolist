import AsyncStorage from '@react-native-async-storage/async-storage';
import generateId from './generateId';

export type TodoItem = {
    id: string;
    title: string;
    order: number;
    completed: boolean;
}

export async function getAllItems(): Promise<TodoItem[]> {
    try {
        const data = await AsyncStorage.getItem('todos');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Failed to load todos from storage', error);
        return [];
    }
}

export async function addItem(title: string) {
    const items = await getAllItems();
    const newItem = {
        id: generateId(),
        title,
        order: items.length,
        completed: false,
    };
    items.push(newItem);
    await AsyncStorage.setItem('todos', JSON.stringify(items));
}

export async function updateItem(todo: TodoItem){
    const items = await getAllItems();
    const index = items.findIndex((item) => item.id === todo.id);
    if (index === -1) {
        console.error('Item not found');
        return;
    }
    items[index] = todo;
    items.sort((a, b) => a.order - b.order);
    await AsyncStorage.setItem('todos', JSON.stringify(items));
    return todo;
}

export async function deleteItem(id: string) {
    const items = await getAllItems();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
        console.error('Item not found');
        return;
    }
    items.splice(index, 1);
    items.forEach((item, i) => {
        item.order = i;
    });
    await AsyncStorage.setItem('todos', JSON.stringify(items));
}