
import { randomUUID } from 'expo-crypto';

export default function generateId(): string{
    return randomUUID();
}