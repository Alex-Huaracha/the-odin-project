import { randomUUID } from 'node:crypto';

export const messages = [
  {
    id: 'adde383a-544a-4189-ab62-5ab95c6f3e86',
    text: 'Hi there!',
    user: 'Alex',
    added: new Date(),
  },
  {
    id: 'd61b5c0f-4ca3-4723-a828-39331ac6995c',
    text: 'Hello World!',
    user: 'Robo-Warrior',
    added: new Date(),
  },
];

export class MessageModel {
  static async getAll() {
    return messages;
  }

  static async create({ input }) {
    const newMessage = {
      id: randomUUID(),
      ...input,
      added: new Date(),
    };
    messages.push(newMessage);
    return newMessage;
  }
}
